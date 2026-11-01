import {createHmac,timingSafeEqual} from 'node:crypto';
export function sign(body:string,secret:string){return createHmac('sha256',secret).update(body).digest('hex');}
export function verify(body:string,signature:string,secret:string){const expected=Buffer.from(sign(body,secret),'hex');if(!/^[a-f0-9]{64}$/.test(signature))return false;return timingSafeEqual(expected,Buffer.from(signature,'hex'));}
// Raw capture only: packet decoding is intentionally gated on a verified EA specification.
export function inspectPacket(raw:Buffer){if(raw.length<2)throw Error('UDP-Paket zu kurz');return {format:raw.readUInt16LE(0),bytes:raw.length,supported:raw.readUInt16LE(0)===2025};}
