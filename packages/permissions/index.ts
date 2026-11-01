import type {Role} from '../domain/index.ts';
export function can(role:Role, action:'league:write'|'result:write'|'telemetry:read'):boolean {return role==='admin'||(role==='steward'&&action==='result:write')||(role==='race-control'&&action==='telemetry:read');}
