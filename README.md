# Brightdesk Forms

<p align="center"><img src="src/branding/mark.svg" alt="Brightdesk brand mark" width="82" height="82"><br><strong>brightdesk</strong></p>
<p align="center"><img src="src/branding/icons/forms.svg" alt="Brightdesk Forms application icon" width="112" height="112"></p>

<p align="center"><strong>Create forms, surveys and quizzes, then collect responses locally.</strong></p>

<p align="center"><a href="https://raw.githubusercontent.com/connormolloy12/Brightdesk-Forms/main/src/branding/previews/forms.svg"><img src="src/branding/previews/forms.svg" alt="Brightdesk Forms interface design" width="100%"></a></p>

<p align="center"><sub>Select the interface image to open the full-size design.</sub></p>

> **Interface design artwork — not a screenshot.** This image shows the intended Brightdesk interface. It is not a capture from the running desktop build. A genuine product screenshot will be added after the current desktop build has been launched and its primary workflow verified.

Brightdesk Forms is a dedicated desktop application within the independent Brightdesk Office Suite. It uses the shared Brightdesk design language and opens directly into Forms.

## Cross-platform consistency

The Windows, macOS and Linux editions use the same approved Brightdesk interface and supported product scope. Shared layout, typography, spacing, component states and navigation follow the [Brightdesk visual and interaction standard](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md). This product's original icon and approved accent remain the same on every operating system. Only operating-system integrations such as window controls, native file dialogs, keyboard conventions and package formats may adapt to platform conventions.

| Operating system | Configured package targets |
| --- | --- |
| Windows | x64 NSIS installer (.exe) |
| macOS | Universal disk image (.dmg), package installer (.pkg) and archive (.zip) |
| Linux | x64 AppImage (.AppImage) and Debian package (.deb) |

These are configured build targets, not confirmation that a package has passed its native build, installation, upgrade and removal checks. Each operating system must pass its own release verification before its download is described as available.

**Terms and first launch:** A valid acceptance of the current Brightdesk Terms and Conditions is required before the product opens. When no current acceptance record exists, a blocking agreement window is shown. Accept continues; declining or closing the window exits the product. This first-use gate is present in the product source for Windows, macOS and Linux. Follow any additional agreement shown by the native installer.

**Updates and removal:** The approved product version and feature scope must remain aligned across all operating systems. Update packages must come from the same tested release. Native installation and removal controls can differ by operating system, but the expected outcome is consistent: remove the product without silently deleting local project data. Do not claim update, upgrade or uninstall verification for an operating system until its native workflow has passed.

## Current first-use workflows

- Create and edit local form titles and descriptions.
- Add, edit and remove short-answer, long-answer, single-choice, multiple-choice and date questions.
- Mark questions as required and validate submitted answers.
- Preview a form, submit responses on this device, review saved responses and delete individual responses.

**Not included in this first version:** Online publishing, public response links, branching logic, scoring, file attachments, cloud response collection and collaboration.

## Engineering and release standard

This product follows the shared requirements for testing, languages, cross-platform installers, data preservation, customer-controlled updates and ongoing maintenance. See the [engineering and release standard](docs/ENGINEERING_AND_RELEASE_STANDARD.md).

## Shared Brightdesk design standard

This product follows the [Brightdesk visual and interaction standard](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md) for branding, icon usage, layout, responsive behaviour and accessibility.



### Live interaction motion

The shared motion stylesheet now animates the entry of the document and product workspaces, the Get apps and Languages views, and native disclosure-panel content. Product buttons use the shared timing and easing scale while preserving the existing horizontal navigation hover treatment. Update checks and downloads show a decorative loading spinner beside the live status text; presentation mode uses the shared open/close overlay and closes immediately when reduced motion is requested.

## Shared motion foundation

This product bundles the canonical Brightdesk motion stylesheet locally at `src/motion.css`, loaded after `src/design-system.css`. Existing product controls use the shared fast timing and standard easing tokens (120 ms); the shared scale also defines 180 ms and 260 ms transitions. Reusable surface, interactive-control, overlay, progress and loading-indicator primitives are available for product-owned components.

The stylesheet is packaged with the desktop product and does not load from GitHub or another network service at runtime. The `prefers-reduced-motion: reduce` setting disables the shared transitions and spinner animation. Motion does not replace keyboard focus, accessibility semantics or component-specific state handling.

## Requirements

- Node.js **24.22.2**
- npm
- Git

## Development

```bash
npm ci
npm start
npm test
```

## Desktop builds

The build scripts target Windows, macOS and Linux:

| Platform | Build command |
| --- | --- |
| Windows | `npm run dist:product:win` |
| macOS | `npm run dist:product:mac` |
| Linux | `npm run dist:product:linux` |

Verify a platform build with the matching `npm run verify:product:<platform>` command.

Build output is stored in the Forms product release directory. Platform packaging should be performed on a compatible runner or operating system.

## Quality and security

`npm test` runs the checked-in test suite. The CI workflow verifies the lockfile and third-party licence notices, runs release preflight checks, and audits npm dependencies. The same checks repeat daily through the scheduled workflow.

Dependabot checks npm packages and GitHub Actions weekly.

Publishing a GitHub Release is a separate manual choice and remains disabled by default.

## Scope

Brightdesk Forms is one of the ten approved Brightdesk products. It remains focused on form creation and local response collection. The main suite coordinates the complete product experience.

## Licence

See [LICENSE](LICENSE), [TERMS_AND_CONDITIONS.txt](TERMS_AND_CONDITIONS.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## CI and installer build cadence

Pull requests and pushes to `main` run the product validation job. Markdown-only changes are excluded from this test workflow because they do not change executable product code; the README freshness check remains responsible for documentation changes.

A scheduled maintenance validation runs every **Friday at 05:17 UTC**. The scheduled run performs product validation on Brightdesk's private macOS ARM64 runner, including release preflight and dependency audit; it does not create desktop installers.

The Windows, macOS and Linux installer matrix remains available through a manual workflow dispatch with `build_installers: true`. Publishing remains a separate opt-in action with `publish_release: true`. This keeps routine checks lighter without removing any operating-system build target or reducing cross-platform release coverage.

## Documentation freshness

The root README is maintained alongside the product, not as an end-of-project task. Every pull request that changes application code, tests, UI, design assets, screenshots, icons, configuration, dependencies, packaging, or build/release workflows must also update this README in the same pull request. Keep feature status, screenshots and visual references, application icons, setup/build instructions, platform compatibility, and repository links aligned with the latest verified implementation. Describe planned or untested functionality as planned, never as completed. The **README freshness** GitHub Actions check requires a root `README.md` update whenever a pull request or direct push to `main` changes a non-Markdown file; a passing check confirms inclusion, while reviewers remain responsible for checking factual accuracy and current visuals.


## Customer network policy

Once installed, this product uses the internet only to check for, download and install official Brightdesk updates. The product does not provide separate in-product installer downloads, customer accounts, passwords, profiles, subscriptions, cloud storage or online services. Normal product work remains local and available offline. Initial installer distribution takes place outside the running product. Spelling checks run locally. Already-installed, integrity-verified dictionaries remain available offline. Entries that are not included in this build are catalogue information only and cannot be downloaded in-product. Future dictionary pack discovery, download and updates must use verified official Brightdesk resources; automatic hybrid fallback and the complete pack catalogue are still pending for this product.

## Private CI runner

Pull-request product tests and README checks run on Brightdesk's private macOS ARM64 runner. Routine pull-request verification does not use GitHub-hosted paid runners. Installer matrix builds and release publishing are separate manual workflow actions and are not run by pull-request checks.


## Shared offline JSON storage

This product bundles the Brightdesk Common-Libs JSON storage helper locally at `src/vendor/brightdesk-common-libs/json-storage.js`. The renderer keeps the established `brightdesk-docs-v3` and `brightdesk-app-setup-v1` storage keys and reads the older `brightdesk-docs-v2` key as a fallback without deleting it. The exact upstream repository, source commit, path, API version and Git blob SHA are recorded in `src/vendor/brightdesk-common-libs/UPSTREAM.json`.

The helper is loaded from the installed product before `src/app.js`. It does not load from GitHub, a package registry or another network service at runtime, so normal document storage remains on this device and works offline.

## Application identity

The Electron main process validates the configured product ID against the shared ten-product catalogue exported by `src/standalone-downloads.js`. The startup import is covered by `tests/main-product-catalog.test.js`, which guards the approved product list so unsupported IDs cannot enter the product launch path.

## Test discovery

`npm test` uses Node.js 24's built-in automatic test discovery (`node --test`). It runs discovered test files under `tests/`, including newly added regression tests, without maintaining a manually curated file list. Platform-specific installer acceptance must still be run on the relevant native operating system; a macOS test run does not verify Windows or Linux installer behaviour.
