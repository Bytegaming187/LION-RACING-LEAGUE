export type Role = 'admin' | 'steward' | 'race-control' | 'team-manager' | 'driver' | 'engineer';
export type SessionKind = 'practice' | 'qualifying' | 'sprint' | 'race';
export interface Driver { id:string; name:string; gameId:string; divisionId:string; teamId:string; accountId?:string; license?:'pending'|'rookie'|'active'|'revoked'; kind?:'regular'|'reserve'|'test' }
export interface Team { id:string; name:string; color:string; divisionId:string; managerAccountId?:string; engineerAccountIds?:string[] }
export interface Division { id:string; name:string; capacity:number }
export interface Weekend { id:string; name:string; circuit:string; startsAt:string; sessions:SessionKind[]; endsAt?:string; eventKind?:'championship'|'screening'|'practice'; circuitId?:string }
export interface Result { driverId:string; teamId:string; laps:number; timeMs:number; status:'finished'|'dnf'|'dsq'; fastestLap?:boolean }
export interface Penalty { id:string; driverId:string; sessionId:string; kind:'time'|'positions'|'points'|'dsq'; value:number; reason:string }
export interface Rules { points:number[]; fastestLapPoints:number; fastestLapTop:number; sprintPoints?:number[] }
export interface League { divisions:Division[]; drivers:Driver[]; teams:Team[]; weekends:Weekend[]; rules:Rules; regulations?:string; stream?:{enabled:boolean;url:string};transferWindow?:{opensAt:string;closesAt:string;seasonStartsAt?:string} }
export const emptyLeague:League = {divisions:[],drivers:[],teams:[],weekends:[],rules:{points:[25,18,15,12,10,8,6,4,2,1],fastestLapPoints:0,fastestLapTop:10}};
export function validateLeague(value:unknown): asserts value is League {
 const l=value as League;
 if(!l || !['divisions','drivers','teams','weekends'].every(k=>Array.isArray((l as unknown as Record<string,unknown>)[k])) || !l.rules || !Array.isArray(l.rules.points)) throw Error('Ungültige Ligadaten');
 if(l.regulations!==undefined&&(typeof l.regulations!=='string'||l.regulations.length>50000))throw Error('Regeltext ungültig oder zu lang');
 for(const collection of [l.divisions,l.drivers,l.teams,l.weekends]) {const ids=new Set<string>();for(const x of collection){if(typeof x?.id!=='string'||!x.id.trim()||x.id.length>100||typeof x.name!=='string'||!x.name.trim()||x.name.length>100||ids.has(x.id))throw Error('IDs müssen eindeutig und Namen gesetzt sein (maximal 100 Zeichen)');ids.add(x.id);}}
 for(const d of l.divisions)if(!Number.isInteger(d.capacity)||d.capacity<1||d.capacity>20||l.drivers.filter(x=>x.divisionId===d.id).length>d.capacity)throw Error('Division: maximal 20 Fahrer');
 for(const t of l.teams)if(!l.divisions.some(d=>d.id===t.divisionId)||l.drivers.filter(d=>d.teamId===t.id).length>2)throw Error('Team: Division fehlt oder mehr als zwei Fahrer');
 for(const t of l.teams)if(!/^#[0-9a-fA-F]{6}$/.test(t.color))throw Error('Teamfarbe muss ein sechsstelliger Hex-Farbwert sein');
 const gameIds=new Set<string>();for(const d of l.drivers){if(typeof d.gameId!=='string'||!d.gameId.trim()||d.gameId.length>200||gameIds.has(d.gameId)||!l.teams.some(t=>t.id===d.teamId&&t.divisionId===d.divisionId))throw Error('Spielkennung oder Teamzuordnung ungültig');gameIds.add(d.gameId);}
 for(const w of l.weekends)if(!Number.isFinite(Date.parse(w.startsAt))||!Array.isArray(w.sessions)||!w.sessions.length||w.sessions.some(s=>!['practice','qualifying','sprint','race'].includes(s)))throw Error('Ungültiges Rennwochenende');
 if([...l.rules.points,l.rules.fastestLapPoints].some(p=>!Number.isFinite(p)||p<0)||!Number.isInteger(l.rules.fastestLapTop)||l.rules.fastestLapTop<1)throw Error('Ungültige Punkteregeln');
 if(l.rules.sprintPoints&&(!Array.isArray(l.rules.sprintPoints)||l.rules.sprintPoints.some(p=>!Number.isFinite(p)||p<0)))throw Error('Ungültige Sprintpunkte');
}
