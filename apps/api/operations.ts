import {randomUUID} from 'node:crypto';
import type {Database} from './database.ts';
import {parseBody} from './database.ts';
import type {League} from '../../packages/domain/index.ts';
import {licenseStatus,bannedWeekend,afterRaceDeadline,beforeDeadline,penaltyLevels,type Case} from '../../packages/domain/regulations.ts';
export async function readCases(db:Database):Promise<Case[]>{return (await db.query('SELECT body FROM portal_cases ORDER BY id')).rows.map(parseBody);}
export async function addCase(db:Database,user:{id:string;role:string},league:League,x:Case){
 const admin=user.role==='admin',official=admin||user.role==='steward'||user.role==='race-control';const own=league.drivers.find(d=>d.accountId===user.id),weekend=league.weekends.find(w=>w.id===x.weekendId);const all=await readCases(db);
 if(typeof x.text!=='string'||!x.text.trim()||x.text.length>5000)throw Error('Bitte eine Beschreibung angeben (maximal 5000 Zeichen)');
 const entry:Case={id:randomUUID(),type:x.type,accountId:user.id,createdAt:new Date().toISOString(),text:x.text.trim(),status:'open'};
 if(x.type==='attendance'){
  if(!own||!weekend)throw Error('Fahrerzuordnung oder Rennwochenende fehlt');if(!beforeDeadline(weekend.startsAt,24))throw Error('An-/Abmeldefrist ist 24 Stunden vor Beginn abgelaufen');if(!['yes','no'].includes(x.status))throw Error('Bitte Teilnahme auswählen');if(x.status==='yes'&&(weekend.eventKind??'championship')==='championship'&&(!['active','rookie'].includes(own.license??'pending')||bannedWeekend(own.id,all,league.weekends)===weekend.id||licenseStatus(own.id,all).seasonBan))throw Error('Keine gültige Startberechtigung; bitte Rennleitung kontaktieren');Object.assign(entry,{driverId:own.id,weekendId:weekend.id,status:x.status});
 }else if(x.type==='protest'){
  if(!own||!weekend?.endsAt||!afterRaceDeadline(weekend.endsAt,48))throw Error('Protest nur bis 48 Stunden nach erfasstem Rennende möglich');try{if(x.video&&!['https:','http:'].includes(new URL(x.video).protocol))throw Error();}catch{throw Error('Video-Link muss gültig sein (optional)');}Object.assign(entry,{driverId:own.id,weekendId:weekend.id,video:x.video});
 }else if(x.type==='decision'||x.type==='absence'||x.type==='replay'){
  if(!official||!league.drivers.some(d=>d.id===x.driverId)||!weekend)throw Error('Nur Offizielle können Fahrerfälle für gültige Events anlegen');Object.assign(entry,{driverId:x.driverId,weekendId:x.weekendId});
  if(x.type==='decision'){if(!Number.isInteger(x.level)||!penaltyLevels[x.level!])throw Error('Ungültige Strafstufe');entry.level=x.level;entry.status='decided';}
  if(x.type==='replay'&&(!weekend.endsAt||!afterRaceDeadline(weekend.endsAt,24)))throw Error('Replay-Anforderung nur bis 24 Stunden nach Rennende');
  if(x.type==='absence'&&Date.now()<Date.parse(weekend.startsAt))throw Error('Fehlmeldung erst nach Beginn möglich');
 }else if(x.type==='team-sanction'){
  if(!admin||!league.teams.some(t=>t.id===x.teamId)||!['points','balance','registration-ban'].includes(x.sanctionKind??'')||!Number.isFinite(x.amount)||x.amount!<0)throw Error('Ungültige Team-Sanktion');Object.assign(entry,{teamId:x.teamId,sanctionKind:x.sanctionKind,amount:x.amount,status:'decided'});
 }else if(x.type==='job'){if(!admin&&!league.teams.some(t=>t.id===x.teamId&&t.managerAccountId===user.id))throw Error('Nur Admin oder zugeordneter Teamchef darf ausschreiben');if(x.teamId){if(!league.teams.some(t=>t.id===x.teamId))throw Error('Unbekanntes Team');entry.teamId=x.teamId;}entry.status='published';
 }else if(x.type==='application'){entry.status='submitted';
 }else if(x.type==='transfer'){
  if(!admin&&!league.teams.some(t=>t.id===x.teamId&&t.managerAccountId===user.id))throw Error('Nur zugeordnete Teamchefs können Personaländerungen melden');entry.teamId=x.teamId;entry.status='submitted';
 }else throw Error('Unbekannter Vorgang');
 await db.transaction(async q=>{if(entry.type==='attendance')await q('DELETE FROM portal_cases WHERE id IN (SELECT id FROM portal_cases WHERE owner=$1 AND kind=$2 AND event_id=$3)',[user.id,'attendance',entry.weekendId]);if(entry.type==='absence'&&all.some(c=>c.type==='absence'&&c.driverId===entry.driverId&&c.weekendId===entry.weekendId))throw Error('Fehlmeldung bereits vorhanden');await q('INSERT INTO portal_cases(id,owner,kind,event_id,body) VALUES($1,$2,$3,$4,$5)',[entry.id,user.id,entry.type,entry.weekendId??'',JSON.stringify(entry)]);await q('INSERT INTO audit_log(at,actor,action,body) VALUES($1,$2,$3,$4)',[entry.createdAt,user.id,'portal.'+entry.type,JSON.stringify(entry)]);});return entry;
}
