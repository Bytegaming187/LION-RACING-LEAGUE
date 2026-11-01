import type {Result,Penalty,Rules} from '../domain/index.ts';
export function score(results:Result[],penalties:Penalty[],rules:Rules){
 if(new Set(results.map(r=>r.driverId)).size!==results.length)throw Error('Doppelter Fahrer');
 for(const r of results)if(!r.driverId||!r.teamId||!Number.isInteger(r.laps)||r.laps<0||!Number.isFinite(r.timeMs)||r.timeMs<0||!['finished','dnf','dsq'].includes(r.status))throw Error('Ungültiges Ergebnis');
 for(const p of penalties)if(!p.reason?.trim()||!Number.isFinite(p.value)||p.value<0||!['time','positions','points','dsq'].includes(p.kind))throw Error('Ungültige Strafe');
 let rows=results.map(r=>({...r,timeMs:r.timeMs+penalties.filter(p=>p.driverId===r.driverId&&p.kind==='time').reduce((a,p)=>a+p.value*1000,0),status:penalties.some(p=>p.driverId===r.driverId&&p.kind==='dsq')?'dsq' as const:r.status})).sort((a,b)=>Number(a.status==='dsq')-Number(b.status==='dsq')||b.laps-a.laps||a.timeMs-b.timeMs||a.driverId.localeCompare(b.driverId));
 for(const p of penalties.filter(p=>p.kind==='positions')){const i=rows.findIndex(r=>r.driverId===p.driverId);if(i>=0){const [r]=rows.splice(i,1);rows.splice(Math.min(i+Math.floor(p.value),rows.length),0,r);}}
 rows=[...rows.filter(r=>r.status!=='dsq'),...rows.filter(r=>r.status==='dsq')];
 return rows.map((r,i)=>({...r,position:i+1,points:Math.max(0,(r.status==='dsq'?0:(rules.points[i]??0)+(r.fastestLap&&i<rules.fastestLapTop?rules.fastestLapPoints:0))-penalties.filter(p=>p.driverId===r.driverId&&p.kind==='points').reduce((a,p)=>a+p.value,0))}));
}
export function standings(sessions:ReturnType<typeof score>[]){const drivers:Record<string,number>={},teams:Record<string,number>={};for(const s of sessions)for(const r of s){drivers[r.driverId]=(drivers[r.driverId]??0)+r.points;teams[r.teamId]=(teams[r.teamId]??0)+r.points;}return {drivers,teams};}
