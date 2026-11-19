# Siddheshwar Smart Technologies

Responsive React + TypeScript website with Vite, Tailwind CSS, React Router DOM, Motion and Lucide icons. The active implementation is in `src/site/`; `src/main.tsx` loads it. Earlier implementation files remain available and are not routed.

## Run locally

Use Node.js 22.12 or later.

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm test
```

PowerShell users with script execution restrictions can use `npm.cmd` instead of `npm`.

## Routes

Exactly 13 main routes: `/`, `/what-we-do`, `/brands`, `/products`, `/solutions`, `/home-automation`, `/audio-video`, `/security-safety`, `/networking`, `/lighting`, `/about`, `/contact`, `/support`.

Products open accessible native dialogs rather than separate pages. Solutions use stable section anchors, including `/solutions#home-automation`, `/solutions#voice-based-controls` and `/solutions#security-solutions`. Unknown routes show a 404 state.

## Content and components

- `src/site/data.ts`: typed services, catalogue selection, solution anchors, brand configuration and existing supplied company contact details.
- `src/site/components.tsx`: navigation, hero carousel, product cards/dialog/carousel, brand marquee, reveals, footer and CTA.
- `src/site/pages.tsx`: page layouts, product filters, scene preview and FAQs.
- `src/site/Forms.tsx`: contact details and configurable enquiry/support forms.
- `src/site/site.css`: charcoal, blue, light gray and slate design system and responsive rules.
- `src/product-data.ts`, `src/akubela-data.ts`, `src/solutions-data.json`: reused supplied catalogue content.
- `public/`: supplied photography, product images, logos and PDF catalogues.

The homepage hero supports automatic rotation, keyboard arrows and touch swipes. Its visible bottom controls were removed as requested. User slide interactions pause automatic rotation. Slides crossfade every 6.5 seconds without continuous image scaling, preserving sharp product details. Hover over the CTA, keyboard focus and reduced motion pause rotation. The pointer can rest over the photograph without stopping autoplay. Manual slide changes pause rotation for nine seconds, then resume when keyboard focus is outside the carousel. The five supplied product photographs are preserved, with responsive WebP sources and complete-image layouts on mobile and narrow tablets. The header is transparent over the homepage hero and gains a readable surface after scrolling. Product tracks support mouse dragging, native touch scrolling and keyboard navigation. Below-fold images load lazily.

## Forms

Copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT` and `VITE_SUPPORT_ENDPOINT` to public HTTPS API URLs. These values are visible in the frontend; never put secrets in them. Restart Vite after changing environment values and rebuild for production.

Both forms validate required fields, email, phone length/characters and message length. They POST JSON containing `name`, `phone`, `email`, `service`, `projectType`, `message`, `product` and `type` (`project` or `support`). A successful HTTP 2xx response confirms receipt. Configure CORS and actual delivery/storage on the receiving service, with appropriate spam prevention and rate limiting.

Without an endpoint, the form clearly states that online submission is unavailable and never confirms that an enquiry was sent. Phone/email links provide real contact alternatives. Network failures show a retry/contact state.

## Deployment and direct links

Publish the contents of `dist/` after `npm run build`. Configure the host to serve `index.html` for application routes while serving real assets normally. Vite development and preview servers already provide this fallback. Included `public/_redirects` supports Netlify-style hosting; `public/web.config` supports IIS with URL Rewrite installed. Other hosts need their equivalent SPA fallback. No deployment is performed by this project.

Example Nginx location:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Browser checks

```sh
npm test
```

Tests use installed Microsoft Edge via Playwright. If Edge is unavailable, install a Playwright browser and adjust `channel` in `playwright.config.ts`. Checks cover the 13 direct routes at 1440, 1024, 768, 390 and 360 pixels, overflow, image URLs, internal navigation, search/filter behavior, modal focus restoration, hero controls, mobile menu/solution anchors, scene previews, lighting groups, FAQs and form validation/unconfigured submission. Test artifacts are ignored by Git.

## Client details required before launch

1. Verify the existing supplied phone, email and Hubli address.
2. Configure receiving APIs and actual delivery for project enquiries and support requests.
3. Brand logos supplied under `public/brands/` populate the homepage marquee and Brands page. Confirm any relationship wording separately; no authorized-partner status is claimed. The marquee uses two identical groups, a 30-second linear loop, edge fades, hover/focus pause, and a static reduced-motion layout.
4. Supply team roles and biographies if desired. Team names and portraits use the provided files under `public/team/`; roles and biographies are not invented.
5. Supply verified equipment lists for audio/video and networking; catalogue filters show a consultation state where no supplied products match.
6. Confirm current product availability and integration compatibility from source catalogues. Product copy uses the existing supplied data; no new technical specifications are invented.
7. Supply approved social URLs if social links are wanted.
8. Confirm rights to supplied photography and catalogue assets. WebP copies are generated under `public/optimized/` without changing originals. No reference recording was found under `references/`.
9. Confirm the hosting platform and its SPA rewrite configuration, plus any required privacy copy and enquiry-data handling policy.

Brand relationships, awards, dates, performance figures, warranty terms and support response commitments are not fabricated.

## Image optimization

The site uses committed WebP copies and `src/site/image-manifest.json` to select smaller images. To regenerate after adding assets, install Pillow and run `python scripts/optimize-images.py`. The original assets are preserved. Normal npm builds do not require Python.

The homepage hero uses a scoped charcoal, ivory and champagne palette; other pages retain the blue site palette. Hero image originals remain under `public/hero/1.png` through `5.png`. `tests/hero.spec.ts` checks all five identities, image loading, product/text separation, links and keyboard wrapping at 1440, 1024, 768, 390 and 360 pixels, and saves visual captures for review.

After replacing `public/hero/1.png` through `5.png`, run `python scripts/optimize-hero.py` to refresh the hero WebP sources and intrinsic dimensions. Source mapping: 1 = SL60, 2 = HyPanel Supreme, 3 = SL30, 4 = Aura Series, 5 = HyPanel KeyPlus. The displayed carousel order stays KeyPlus, Supreme, Aura, SL60, SL30.

Hero quality: full-size WebPs preserve source pixels losslessly; mobile variants use quality 95. Desktop image-size hints account for the full photograph size needed by `object-fit: cover`, rather than just the viewport width. Source detail is limited by the supplied PNG resolution.

Typography uses the supplied Cormorant Garamond variable font for headings and Forum for supporting text. Font files and their OFL licenses are self-hosted under `public/fonts/`; Google Fonts is no longer required.


### Akubela catalogue

The brand landing page is `/products/automation/akubela`. Category pages and all 79 product detail pages are driven by `src/site/akubela/manifest.json`, which explicitly maps each supplied product to its original WebP filename and records intrinsic image dimensions. The catalogue uses the 79 existing assets in `public/products/akubela/`; no generated product imagery is used. Software entries are identified separately from hardware. Product enquiries use the existing `/contact?interest=...` flow.

Run `node node_modules/@playwright/test/cli.js test tests/akubela.spec.ts` to verify category totals, unique records, all image URLs and product routes, responsive filtering/search, enquiries and mobile menu discovery. Existing shared Akubela cards retain their modal interaction and offer a full product page link. Other brands keep their existing catalogue behaviour.
