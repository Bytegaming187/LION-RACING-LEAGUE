// EA F1 25 UDP v3: packed 29-byte header, Event packet 3, COLL + two car indices.
export function collision(raw:Buffer){if(raw.length<35||raw.readUInt16LE(0)!==2025||raw[5]!==1||raw[6]!==3||raw.toString('ascii',29,33)!=='COLL')return null;return {session:raw.readBigUInt64LE(7).toString(),frame:raw.readUInt32LE(19),cars:[raw[33],raw[34]]};}
