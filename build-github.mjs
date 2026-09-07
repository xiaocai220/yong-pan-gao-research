import fs from 'node:fs';
import path from 'node:path';
import site from './site.json' with {type:'json'};

await import('./build.mjs');

const githubOrigin=process.env.SITE_ORIGIN;
const base=(process.env.SITE_BASE_PATH||'').replace(/\/$/,'');
if(!githubOrigin||!base)throw new Error('SITE_ORIGIN and SITE_BASE_PATH are required');
const canonicalOrigin=githubOrigin.replace(/\/$/,'')+base;

function rewrite(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    const filename=path.join(directory,entry.name);
    if(entry.isDirectory())rewrite(filename);
    else if(/\.(html|xml|txt)$/.test(entry.name)){
      let content=fs.readFileSync(filename,'utf8').replaceAll(site.origin,canonicalOrigin);
      if(entry.name.endsWith('.html'))content=content.replaceAll('href="/','href="'+base+'/');
      fs.writeFileSync(filename,content);
    }
  }
}
rewrite('dist');
fs.writeFileSync('dist/.nojekyll','');
console.log(`Prepared GitHub Pages build at ${canonicalOrigin}`);
