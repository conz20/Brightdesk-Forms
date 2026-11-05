# Brightdesk Forms

<p align="center"><img src="src/branding/mark.svg" alt="Brightdesk brand mark" width="82" height="82"><br><strong>brightdesk</strong></p>
<p align="center"><img src="src/branding/icons/forms.svg" alt="Brightdesk Forms application icon" width="112" height="112"></p>

<p align="center"><strong>Create forms, surveys and quizzes, then collect responses locally.</strong></p>

<p align="center"><a href="https://raw.githubusercontent.com/connormolloy12/Brightdesk-Forms/main/src/branding/previews/forms.svg"><img src="src/branding/previews/forms.svg" alt="Brightdesk Forms workspace design preview" width="100%"></a></p>

<p align="center"><sub>Select the preview to open the full-size artwork.</sub></p>

> **Concept artwork — not a screenshot.** The preview above is original Brightdesk design artwork, not a capture from the running desktop build. A genuine screenshot will be added only after the current product window has been launched and its primary workflow checked.

Brightdesk Forms is a dedicated desktop application within the independent Brightdesk Office Suite. It uses the shared Brightdesk design language and opens directly into Forms.

## Current first-use workflows

- Create and edit local form titles and descriptions.
- Add, edit and remove short-answer, long-answer, single-choice, multiple-choice and date questions.
- Mark questions as required and validate submitted answers.
- Preview a form, submit responses on this device, review saved responses and delete individual responses.

**Not included in this first version:** Online publishing, public response links, branching logic, scoring, file attachments, cloud response collection and collaboration.

## Shared Brightdesk design standard

Follow the local [approved design brief](docs/BRIGHTDESK_DESIGN.md) and canonical [Brightdesk visual standard](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md). The approved Forms accent is `#C35D68`; preserve the shared navy/light shell and this product's original SVG identity.

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

## Cross-platform desktop packages

The approved cross-platform target is one Brightdesk interface and product scope on Windows, macOS and Linux. Each product must retain its approved icon and accent across those systems. Only operating-system integrations such as window chrome, native dialogs, keyboard conventions, permissions and packaging may vary.

| Platform | Configured package target |
| --- | --- |
| Windows | x64 NSIS installer (.exe) |
| macOS | Universal disk image (.dmg), package installer (.pkg) and archive (.zip) |
| Linux | x64 AppImage (.AppImage) and Debian package (.deb) |

These are configured build targets, not confirmation that installers are published or have passed native verification. Build and verify each package on its target operating system before describing it as available. Release checks must cover installation, first launch, upgrade, launch after upgrade and removal. Removing Brightdesk must not silently delete local project data.

The customer-facing release version and release approval are managed centrally by Brightdesk Office Suite. Publishing remains a separate manual action.

Build and verify Forms on its matching target operating system:

| Platform | Build command | Verification command |
| --- | --- | --- |
| Windows | `npm run dist:product:win` | `npm run verify:product:win` |
| macOS | `npm run dist:product:mac` | `npm run verify:product:mac` |
| Linux | `npm run dist:product:linux` | `npm run verify:product:linux` |
## Quality and security

`npm test` runs the checked-in test suite. The CI workflow verifies the lockfile and third-party licence notices, runs release preflight checks, and audits npm dependencies. The same checks repeat daily through the scheduled workflow.

Dependabot checks npm packages and GitHub Actions weekly.

Publishing a GitHub Release is a separate manual choice and remains disabled by default.

## Scope

Brightdesk Forms is one of the ten approved Brightdesk products. It remains focused on form creation and local response collection. The main suite coordinates the complete product experience.

## Licence

See [LICENSE](LICENSE), [TERMS_AND_CONDITIONS.txt](TERMS_AND_CONDITIONS.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
