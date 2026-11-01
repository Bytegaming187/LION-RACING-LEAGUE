import type {NextRequest} from 'next/server';
export const dynamic='force-dynamic';
async function proxy(req:NextRequest){if(req.method==='POST'&&req.headers.get('origin')!==req.nextUrl.origin)return Response.json({error:'Ungültiger Ursprung'},{status:403});try{const r=await fetch('http://127.0.0.1:4100',{method:req.method,body:req.method==='POST'?await req.text():undefined,cache:'no-store',signal:AbortSignal.timeout(2000)});return new Response(r.body,{status:r.status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});}catch{return Response.json({error:'Simulationsdienst nicht gestartet. npm run simulator ausführen.'},{status:503});}}
export {proxy as GET,proxy as POST};
