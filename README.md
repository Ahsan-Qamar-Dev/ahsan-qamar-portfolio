# Ahsan Qamar — Portfolio

A personal portfolio for Ahsan Qamar, featuring Flutter apps, machine learning experiments, and web projects. Built with React 19, TypeScript, Vite, and CSS.

**Live website:** deployment in progress.

[GitHub profile](https://github.com/Ahsan-Qamar-Dev) · [LinkedIn](https://www.linkedin.com/in/ahsan-qamar-/) · [Email](mailto:ahsan.qamar2004@gmail.com)

## Features

- Dark mode by default, with a saved light-mode preference.
- Always-visible navigation below AQ, across mobile and desktop.
- Dedicated Home, About, Projects, Experience, and CV pages.
- Six featured application repositories with category filters, plus profile and additional experiment links.
- Full-color portrait displayed without cropping.
- CV preview followed by an original PDF download.
- Self-hosted fonts, reduced-motion support, keyboard controls, and deployment security headers.

## Development

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The production output is `dist/`. Publish only that directory. Do not publish the Vite development server, local research files, or the repository root as a static folder.

## Project structure

- `src/pages/`: Home, About, Experience, Projects, CV, and not-found pages.
- `src/components/`: shared navigation, project cards, headings, and contact sections.
- `src/data/portfolio.ts`: profile details and project information.
- `src/styles/`: shared theme, responsive layout, and page styling.
- `public/`: intentional public CV, images, favicon, and licensed fonts.
- `scripts/`: release checks, hosting-header generation, and asset maintenance.
- `.github/workflows/check.yml`: build, dependency audit, and release checks on pushes and pull requests.

## Deployment

Vercel: import this GitHub repository, use the Vite framework preset, build with `npm run build`, and publish `dist`. `vercel.json` supplies routes, cache settings, and security headers.

Netlify: import the repository; `netlify.toml` supplies the build configuration. Redirects and headers are included in the build output.

Both configurations support direct visits and reloads at `/`, `/about`, `/projects`, `/experience`, and `/cv`. Other direct URLs use the host's 404. No environment variables are needed.

## Verification

See [the deployment audit](DEPLOYMENT_AUDIT.md) for the checks performed and their limits. Run:

```sh
npm audit
npm run build
```

In separate terminals:

```sh
npm run audit:serve
```

```sh
npm run check:release
```

The audit server binds only to localhost. GitHub Actions runs the same release checks automatically. Live-host HTTPS, header enforcement, and browser checks must also be verified after deployment.

## Updating content

Edit `src/data/portfolio.ts` and the page components. When replacing `public/ahsan-qamar-cv.pdf`, regenerate `public/images/cv-preview.png` with `scripts/render-cv-preview.py` (requires `pypdfium2`) and update the image dimensions in `CvPage.tsx` if necessary. The public CV intentionally includes the provided phone number.

The portrait retains the supplied 1122 × 1402 resolution and is not advertised as native 4K. The preview image is rendered from the real PDF; the downloaded document is unchanged.

Fonts are redistributed under the SIL Open Font License; copies are included in `public/fonts/`. Local research material is excluded from Git and the deployed build.
