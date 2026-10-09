# Portfolio deployment audit

Completed locally on 9 October 2026. This is a pre-deployment review of this static portfolio, not a guarantee of zero vulnerabilities or a hosted penetration test. No website was published.

## Result

No blocking application issue was identified in the checks executed. The production build, dependency audit, static release checks, and 45 Chromium responsive checks pass. Actual hosting configuration, HTTPS, and other browser engines still require verification after deployment.

## Checks performed

| Area | Evidence and result |
| --- | --- |
| Responsive layout | Home, About, Projects, Experience, and CV at 320, 390, 768, 1024, 1440, and 1920px in dark mode; all five at 320, 768, and 1440px in light mode. 45 cases: no document overflow; page navigation remained visible. These are resized desktop browser viewports, not physical-device tests. |
| Semantic basics | Each tested page has one main landmark and one H1. No unnamed buttons, missing image alt attributes, empty hrefs, JavaScript links, or unsafe new-tab links found. This is not a full WCAG certification. |
| Interactions | Project filters show 2 Mobile, 2 AI/data, 2 Web/backend, and 6 All projects. Theme preference survives reload. A native details accordion opens with Enter. The homepage Preview CV link opens /cv with Enter. |
| CV workflow | Links lead to /cv before downloading. A rendered image of the actual one-page PDF provides a consistent preview without PDF plugins. The actual Download PDF button was activated; its downloaded SHA-256 matches the original PDF. The original is unmodified. |
| Runtime | No console errors or warnings observed while testing the production pages. Self-hosted fonts loaded, with valid WOFF2 signatures and OFL licenses. |
| Build | TypeScript strict compilation and Vite production build pass. JavaScript is approximately 295kB, or 93kB gzip; CSS approximately 31kB, or 7kB gzip. |
| Dependencies | npm audit: zero known vulnerabilities across production and development dependencies. Older major versions reported by npm outdated are not themselves vulnerability findings; no unnecessary major upgrades were introduced. |
| Credential review | Source reviewed for network clients, HTML injection, dynamic code execution, credentials, and browser storage. Release scanned for common private-key, cloud-key, GitHub-token, Stripe-key, and JWT patterns. No credential finding. A broad password-word match was React DOM's input-type table, not a password value. Pattern scanning cannot detect every possible secret. |
| Release contents | dist contains only intended static files. No research files, environment files, package manifests, original source files, or source maps are included. Local production server rejected private-path, missing-file, and encoded traversal probes. Only dist must be published. |
| Privacy | No analytics, trackers, contact submission service, database, authentication, cookies set by the application, or automatic external font requests. Only the theme preference is stored in localStorage. Normal hosting access logs are controlled by the host. |
| Uploaded files | Selected portrait has no embedded metadata. PDF has no embedded attachments or form fields; its five annotation actions are URI links. It has public name/title/generation metadata. |
| Link destinations | All seven GitHub repository endpoints returned 200. EDA Pro's Streamlit URL is reachable in the browser but currently shows a sleeping app with a wake button; a plain HTTP client encounters redirects. Results are in research/link-checks.json. LinkedIn may require sign-in; its profile/posts were previously reviewed after authorized sign-in. Colab and authenticated platforms are not guaranteed publicly accessible to every visitor. |

## Fixes applied

- Added a strict CSP: same-origin scripts, styles, fonts and images; no fetch connections, forms, plugins, frames, base URL changes, or framing by another site.
- Added X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and HTTPS HSTS policy to generated Vercel/Netlify configuration.
- Removed the inline theme bootstrap and inline chart-bar styles so the CSP does not need unsafe-inline or unsafe-eval.
- Self-hosted fonts, preserving the design while removing automatic requests to Google font servers.
- Darkened light-mode muted and accent colors. Against the main light background their contrast ratios exceed 4.5:1; complex artwork and every possible state were not certified.
- Added an IntersectionObserver fallback and basic no-JavaScript contact links.
- Removed an unused old portrait from public assets and excluded research from Git tracking.
- Added a reliable CV preview page and a separate PDF download button. No iframe security exceptions are necessary.
- Limited hosted SPA rewrites to the five real page routes, so missing assets do not return the app HTML. Unknown direct URLs use the host's 404; the app still has a client-side not-found route.

## Intentional public information

The website exposes your name, professional background, Lahore location, portrait, Gmail, GitHub/LinkedIn links, and CV. You explicitly chose to keep +92 306 5532235 in the downloadable CV, and it also appears in the CV preview. Public email/phone details can be collected by visitors or bots; they are intentional content, not hidden leaks.

## Limits and remaining deployment checks

- Only the available Chromium in-app browser was executed. Firefox, Safari, Edge, iOS/Android browsers, assistive technologies, and real device behavior have not been directly tested.
- Do not deploy the Vite dev server or the audit server. Use a managed static host and publish dist only. Server configuration can create exposures that this local code review cannot rule out.
- Header generation follows [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json) and [Netlify custom headers](https://docs.netlify.com/manage/routing/headers/). Local HTTP checks use a test server that applies the same policy; they do not prove that a host applies these files correctly.
- After publishing, verify the live response headers, HTTPS certificate/redirect, HSTS over HTTPS, every route reload, PDF download, missing asset 404s, host directory listing behavior, and any host-added analytics/scripts. A live URL is needed for those checks.
- The full-quality portrait remains about 2.1MB, deliberately preserving your supplied image. It may load slowly on constrained mobile connections; no throttled performance benchmark or Lighthouse score is claimed.
- The static portfolio has no backend or user-input processing. Database injection, account authorization, server sessions, and CSRF checks are not applicable to this application. This review does not audit the separate projects linked from the portfolio.

## Re-run

Run npm ci, npm run build, and npm audit. In one terminal run npm run audit:serve, then in another run npm run check:release. The test server binds only to 127.0.0.1:4173. The application dev preview remains at 127.0.0.1:5173.

Machine-readable evidence and review screenshots remain in the local research directory, which is excluded from both the deployable output and Git tracking. Regenerate the CV preview with scripts/render-cv-preview.py whenever the public PDF changes; its rendering dependency is pypdfium2.
