# Yong-Pan Gao research website

Eight selected first-author papers, English editorial summaries and Chinese overviews, original publication links and BibTeX downloads.

Build: `node build.mjs`. Validate: `node validate.mjs`. Static public output: `dist/`.

Edit `papers.json` for content, `styles.css` for appearance, and `site.json` for the canonical origin. `indexnow.json` supplies the public verification key used for active URL submission after deployment. No external runtime dependencies, client-side tracking, forms or accounts are used by the website itself.

Publication metadata and descriptions were checked against publisher records and author preprints. Editorial summaries are labeled and link to original abstracts. The site does not host publisher PDFs or claim independent reproduction of results. Author order and published titles are preserved.

The environment's pinned Sites initializer failed before source generation with an EPERM path error. This dependency-free static implementation is packaged using Sites' shared output validation and staging utility. The Bash wrapper is unavailable in this Windows environment; the same staged directory is archived with Python tarfile.
