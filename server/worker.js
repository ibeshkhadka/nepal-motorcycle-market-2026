// Build replaces these placeholders with the retained site and research data.
const HTML = '__HTML__';
const RESEARCH = '__RESEARCH__';
const brandSlug=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const BRAND_PATHS=new Set(JSON.parse(RESEARCH).map(r=>'/brands/'+brandSlug(r.brand)));
const MODELS = new Set(JSON.parse(RESEARCH).map(r=>r.brand+'|'+r.model));
function json(data,status=200){return Response.json(data,{status,headers:{'Cache-Control':'private, no-store'}})}
async function listFavorites(db,userId){
 const result=await db.prepare('SELECT model_key FROM favorites WHERE user_id = ? ORDER BY model_key').bind(userId).all();
 return result.results.map(row=>row.model_key);
}
async function setFavorite(db,userId,key,favorite){
 const statement=favorite?'INSERT INTO favorites (user_id, model_key) VALUES (?, ?) ON CONFLICT DO NOTHING':'DELETE FROM favorites WHERE user_id = ? AND model_key = ?';
 await db.prepare(statement).bind(userId,key).run();
}
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==='/api/favorites'){
   const userId=request.headers.get('oai-authenticated-user-id');
   if(!userId)return json({error:'Sign in to use favorites.'},401);
   if(!env.DB)return json({error:'Favorites are temporarily unavailable.'},503);
   try{
    if(request.method==='GET')return json({keys:await listFavorites(env.DB,userId)});
    if(request.method!=='PUT')return json({error:'Method not allowed.'},405);
    const origin=request.headers.get('origin');
    if(origin&&origin!==url.origin)return json({error:'Invalid origin.'},403);
    if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'JSON required.'},415);
    const body=await request.json();
    if(typeof body.key!=='string'||!MODELS.has(body.key)||typeof body.favorite!=='boolean')return json({error:'Invalid favorite.'},400);
    await setFavorite(env.DB,userId,body.key,body.favorite);
    return json({ok:true});
   }catch(error){console.error('Favorite storage failed',error);return json({error:'Could not load or save favorites.'},503);}
  }
  if(request.method!=='GET'&&request.method!=='HEAD')return new Response('Method not allowed',{status:405});
  if(url.pathname==='/research.json')return new Response(request.method==='HEAD'?null:RESEARCH,{headers:{'Content-Type':'application/json; charset=utf-8'}});
  const linkedModel=url.searchParams.get('model');
  if((url.pathname==='/'||url.pathname==='/index.html')&&MODELS.has(linkedModel)){
   const target='/brands/'+brandSlug(linkedModel.split('|')[0])+url.search;
   return new Response(null,{status:302,headers:{Location:target,'Cache-Control':'no-store'}});
  }
  const pagePath=url.pathname.replace(/\/$/,'')||'/';
  if(pagePath!=='/'&&pagePath!=='/index.html'&&!BRAND_PATHS.has(pagePath))return new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><h1>Page not found</h1><p><a href="/">Browse all companies</a></p></html>',{status:404,headers:{'Content-Type':'text/html; charset=utf-8'}});
  return new Response(request.method==='HEAD'?null:HTML,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store'}});
 }
};
