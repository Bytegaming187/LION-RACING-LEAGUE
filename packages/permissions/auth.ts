import {randomBytes,scrypt,timingSafeEqual,createHash} from 'node:crypto';
async function derive(password:string,salt:string):Promise<Buffer>{return new Promise((resolve,reject)=>scrypt(password,salt,64,(error,key)=>error?reject(error):resolve(key)));}
export async function hashPassword(password:string){if(typeof password!=='string'||password.length<12||password.length>256)throw Error('Passwort muss 12 bis 256 Zeichen lang sein');const salt=randomBytes(16).toString('hex');return `${salt}:${(await derive(password,salt)).toString('hex')}`;}
export async function checkPassword(password:string,hash:string){if(typeof password!=='string'||password.length>256)return false;const [salt,value]=hash.split(':');if(!salt||!value)return false;const key=await derive(password,salt),stored=Buffer.from(value,'hex');return stored.length===key.length&&timingSafeEqual(key,stored);}
export function sessionHash(token:string){return createHash('sha256').update(token).digest('hex');}
