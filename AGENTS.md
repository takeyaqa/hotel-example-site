# AGENTS.md

## Repository Overview

This repository contains a static hotel-booking practice site for browser automation. It has no bundling or application build step. Pages load native ES modules from `src/` and locale-specific content from `data/`.

## Repository Layout

- `index.html`: root entry point.
- `en-US/` and `ja/`: localized pages. Keep equivalent user flows aligned across both locales unless a page is intentionally locale-specific.
- `src/`: application JavaScript. Shared logic belongs in `src/lib/`.
- `src/vendor/`: vendored browser libraries. Do not reformat or edit these files as part of unrelated work.
- `data/<locale>/`: localized messages, plans, and preset users.
- `css/`: site and vendored styles.
- `e2e/<locale>/`: Playwright end-to-end tests for each locale.
- `scripts/server.js`: local static HTTP server.
- `scripts/inject_analytics.js`: deployment-only analytics injection.
- `.github/workflows/`: pull-request checks, deployed-site tests, and GitHub Pages deployment.

## Tooling and Setup

- Use Node.js 24 and pnpm 10. `mise install` can provision the versions declared in `mise.toml`.
- Install dependencies with `pnpm install`.
- Install the Chromium test browser with `pnpm exec playwright install chromium`. Use `--with-deps` when system dependencies are also required.
- Serve the repository with `node scripts/server.js`, then open `http://localhost:8080/en-US/` or `http://localhost:8080/ja/`.
- Do not open pages through `file://`; native modules and JSON loading require HTTP.

## Development Guidelines

- Preserve the no-build static-site architecture. Reference browser-ready assets directly from HTML.
- Use native ES module syntax and include the `.js` extension in relative imports.
- Keep shared behavior locale-neutral where possible. Put localized strings and fixture data in the matching `data/en-US/` and `data/ja/` files rather than duplicating them in JavaScript.
- When changing a shared user flow, inspect the corresponding HTML, data, and E2E coverage in both locales. Preserve intentional locale differences such as labels, date formats, currencies, and preset users.
- The application stores state only in cookies, Session Storage, and Local Storage. Tests and changes must not assume a server-side database or persistent backend.
- Prefer accessible HTML and Playwright locators based on roles and labels. Keep visible labels and tests synchronized.
- Do not manually edit minified files or third-party code under `src/vendor/`, or minified CSS under `css/`, unless the task explicitly upgrades that dependency.
- Avoid committing generated output such as `_site/`, `playwright-report/`, or `test-results/`.

## Formatting and Linting

- Format tracked source files with `pnpm run fmt`.
- Check formatting without changing files with `pnpm run fmt:check`.
- Run `pnpm run lint` for JavaScript and TypeScript linting.
- The formatter and linter intentionally ignore minified vendor assets and `src/vendor/datepicker-ja.js`.

## Testing

- Run the full local Playwright suite with `pnpm run test`. Playwright starts `scripts/server.js` automatically when needed.
- Run one spec while iterating with `pnpm exec playwright test e2e/<locale>/<name>.spec.ts`.
- Use `pnpm run test:headed` for a visible browser or `pnpm run test:ui` for Playwright UI mode.
- Use `USE_DEPLOYED_SITE=true pnpm run test` only when the task explicitly needs validation against the deployed site; this skips the local server and targets the production URL.
- Add or update tests in both locale suites when shared behavior changes. Keep assertions locale-specific instead of weakening them to make both locales pass.
- Before handing off a change, run the narrowest relevant test during iteration, then `pnpm run fmt:check`, `pnpm run lint`, and the full `pnpm run test` when the change can affect user-visible behavior.

## Deployment Constraints

- GitHub Pages publishes only `assets/`, `css/`, `data/`, `en-US/`, `ja/`, `src/`, `favicon.ico`, and the root `index.html`.
- If runtime code needs a new file or top-level directory, update `.github/workflows/static.yml` so the deployed artifact includes it.
- Analytics tags are injected into the copied `_site/` artifact during deployment. Do not hard-code the production analytics ID into source HTML.

## Change Scope

- Keep changes focused on the requested behavior and preserve unrelated user edits.
- Use Conventional Commits for commit messages.
- Before creating a commit, run `pnpm run fmt`, `pnpm run lint`, and `pnpm run test`. Resolve any failures before committing.
- Ignore changes to `pnpm-lock.yaml` during code review. Review dependency intent in `package.json` and treat the lockfile as generated output.
- Follow `CONTRIBUTING.md`: general feature pull requests are not currently accepted, and proposed external changes should be discussed in an issue first.
- Report security vulnerabilities through the private GitHub Security Advisory process described in `SECURITY.md`, not through a public issue.
