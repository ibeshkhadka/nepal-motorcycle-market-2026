import {readFile,writeFile,mkdir,rm,copyFile,cp} from 'node:fs/promises';
const base=(process.env.PAGES_BASE_PATH||'/nepal-motorcycle-market-2026/').replace(/\/?$/,'/');
let html=await readFile('src/index.html','utf8');
html=html.replaceAll('__BASE_PATH__',base);
const research=JSON.parse(await readFile('src/research.json','utf8'));
html=html.replace('<meta name="viewport"',`<meta name="site-base-path" content="${base}" />\n<meta name="viewport"`);
html=html.replaceAll('href="/"',`href="${base}"`);
html=html.replace("const routeSlug=location.pathname.replace(/\\/$/,'').split('/')[2];", "const BASE_PATH=document.querySelector('meta[name=site-base-path]').content;\nconst appPath=location.pathname.startsWith(BASE_PATH)?'/'+location.pathname.slice(BASE_PATH.length):location.pathname;\nconst routeSlug=appPath.replace(/\\/$/,'').split('/')[2];");
html=html.replace("location.pathname.startsWith('/brands/')", "appPath.startsWith('/brands/')");
html=html.replace("const companyPath=b=>'/brands/'+slug(b.brand);", "const companyPath=b=>BASE_PATH+'brands/'+slug(b.brand)+'/';");
html=html.replace("renderFilters(); render();loadFavorites();", "const oldSharedModel=new URL(location.href).searchParams.get('model');\nif(!pageBrand&&oldSharedModel){const brand=DATA.find(b=>b.brand===oldSharedModel.split('|')[0]);if(brand)location.replace(companyPath(brand)+location.search);}\nrenderFilters(); render();loadFavorites();");
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('src/assets','dist/assets',{recursive:true});
await writeFile('dist/index.html',html);await copyFile('src/research.json','dist/research.json');await writeFile('dist/.nojekyll','');
const slug=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
for(const brand of new Set(research.map(row=>row.brand))){const dir='dist/brands/'+slug(brand);await mkdir(dir,{recursive:true});await writeFile(dir+'/index.html',html);}
await writeFile('dist/404.html',`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><h1>Page not found</h1><a href="${base}">Browse all companies</a></html>`);
console.log('Built overview and 20 company pages at '+base);
