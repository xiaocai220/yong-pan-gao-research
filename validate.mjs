import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const papers=JSON.parse(fs.readFileSync('papers.json','utf8'));
const site=JSON.parse(fs.readFileSync('site.json','utf8'));
assert.equal(papers.length,3);
for(const p of papers){
 assert.equal(p.authors[0],'Yong-Pan Gao');
 const route=`/papers/${p.slug}/`;
 const html=fs.readFileSync(`dist${route}index.html`,'utf8');
 assert(html.includes(`<meta name="citation_title" content="${p.title}">`));
 assert.equal((html.match(/name="citation_author"/g)||[]).length,p.authors.length);
 assert(html.includes(`<link rel="canonical" href="${site.origin}${route}">`));
 const ld=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.equal(ld.identifier,`https://doi.org/${p.doi}`);
 assert.equal(ld.author[0].name,'Yong-Pan Gao');
 assert(fs.readFileSync(`dist${route}citation.bib`,'utf8').includes(`doi = {${p.doi}}`));
}
for(const file of ['dist/index.html',...papers.map(p=>`dist/papers/${p.slug}/index.html`)]){
 const html=fs.readFileSync(file,'utf8');
 for(const m of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)){
  const href=m[1]; if(/^https?:/.test(href))continue;
  let target=href.startsWith('/')?path.join('dist',href):path.join(path.dirname(file),href);
  if(href.endsWith('/'))target=path.join(target,'index.html');
  assert(fs.existsSync(target),`${file}: missing ${href}`);
 }
}
const map=fs.readFileSync('dist/sitemap.xml','utf8');
assert.equal((map.match(/<loc>/g)||[]).length,4);
assert(fs.readFileSync('dist/robots.txt','utf8').includes(`Sitemap: ${site.origin}/sitemap.xml`));
console.log('PASS: author order, 3 citations, canonical URLs, JSON-LD, internal links, sitemap and crawler rules.');
