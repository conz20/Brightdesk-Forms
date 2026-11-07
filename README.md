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

## Shared Brightdesk design standard

This product follows the [Brightdesk visual and interaction standard](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md) for branding, icon usage, layout, responsive behaviour and accessibility.

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

A scheduled maintenance validation runs every **Friday at 05:17 UTC**. The scheduled run performs the Ubuntu-based test, release-preflight and dependency-audit job only; it does not create desktop installers.

The Windows, macOS and Linux installer matrix remains available through a manual workflow dispatch with `build_installers: true`. Publishing remains a separate opt-in action with `publish_release: true`. This keeps routine checks lighter without removing any operating-system build target or reducing cross-platform release coverage.

## Documentation freshness

The root README is maintained alongside the product, not as an end-of-project task. Every pull request that changes application code, tests, UI, design assets, screenshots, icons, configuration, dependencies, packaging, or build/release workflows must also update this README in the same pull request. Keep feature status, screenshots and visual references, application icons, setup/build instructions, platform compatibility, and repository links aligned with the latest verified implementation. Describe planned or untested functionality as planned, never as completed. The **README freshness** GitHub Actions check requires a root `README.md` update whenever a pull request or direct push to `main` changes a non-Markdown file; a passing check confirms inclusion, while reviewers remain responsible for checking factual accuracy and current visuals.

## Test discovery

The standard `npm test` command uses Node.js 24 automatic test discovery so newly added test files are included without maintaining a manual list. Suite-only contract checks remain explicitly skipped in individual product repositories. Network-backed dictionary integration checks remain opt-in with `BRIGHTDESK_LIVE_DICT_TESTS=1`.
