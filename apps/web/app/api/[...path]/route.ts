import type {NextRequest} from 'next/server';
export const runtime='nodejs';
async function proxy(req:NextRequest,{params}:{params:Promise<{path:string[]}>}){
 if(!['GET','HEAD'].includes(req.method)){const origin=req.headers.get('origin');if(origin&&origin!==req.nextUrl.origin)return Response.json({error:'Ungültiger Ursprung'},{status:403});}
 const {path}=await params,headers=new Headers({'Content-Type':'application/json'});for(const key of ['authorization','cookie']){const value=req.headers.get(key);if(value)headers.set(key,value);}
 try{const response=await fetch(`${process.env.API_URL??'http://127.0.0.1:4000'}/v1/${path.map(encodeURIComponent).join('/')}`,{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:await req.text(),cache:'no-store',signal:req.signal});const out=new Headers({'Content-Type':response.headers.get('content-type')??'application/json','Cache-Control':'no-store'});for(const value of response.headers.getSetCookie())out.append('Set-Cookie',value);return new Response(response.body,{status:response.status,headers:out});}catch{return Response.json({error:'API nicht erreichbar'},{status:503});}
}
export {proxy as GET,proxy as PUT,proxy as POST};
