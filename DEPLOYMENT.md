# Deploying the website

Run `npm run build`, then upload the **contents** of `dist` into the domain's
document root (usually `public_html`). `index.html` must be directly inside that
root, alongside `assets`, `products`, `solutions`, and the other asset folders.
This build expects to be hosted at the domain root, not in a subfolder.

## Apache / LiteSpeed / cPanel

Upload `dist/.htaccess` too. Enable "Show Hidden Files" in the hosting file manager
if needed. This file is automatically copied from `public/.htaccess` on every build.
If the server already has an `.htaccess`, preserve a backup and merge any required
hosting settings with these routing rules.

The site renders pages from the URL in React. Direct visits, menu clicks and
refreshes must therefore serve `index.html`. Several page paths also match real
asset directories (`/products`, `/solutions`, `/certifications`). Excluding existing
directories from the rewrite would leave those pages returning a directory 403.
The supplied rules preserve existing files but route directory URLs to React.
Apache 2.4+ with mod_rewrite and permission to use rewrite rules in `.htaccess`
is required (or equivalent LiteSpeed support).

After uploading, directly open and refresh `/about`, `/products`, `/solutions`,
`/certifications`, and a product or solution detail URL. Check that their images
also load and that `/contact?interest=Lighting#contact` retains its enquiry value.

If 403 persists, ask the host to check its error log, document root, access rules,
and file ownership/permissions (commonly 755 for folders and 644 for files).
Do not use 777 permissions. If `.htaccess` triggers 500, ask the host to enable
the required rewrite directives or install the equivalent server-level rules.

## Other hosting

Vercel uses the existing `vercel.json`. Nginx ignores `.htaccess`; its site config
needs the equivalent fallback, for example `try_files $uri /index.html;` in the
root location. Do not add `$uri/` to that fallback, because page names collide
with asset directories. A local Vite preview cannot verify Apache configuration;
the direct-URL checks above must also pass on the actual host.
