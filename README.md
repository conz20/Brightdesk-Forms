# Brightdesk Forms

<p align="center"><img src="src/branding/mark.svg" alt="Brightdesk brand mark" width="82" height="82"><br><strong>brightdesk</strong></p>
<p align="center"><img src="src/branding/icons/forms.svg" alt="Brightdesk Forms application icon" width="112" height="112"></p>

<p align="center"><strong>Create forms, surveys and quizzes, then collect responses locally.</strong></p>

<p align="center"><img src="src/branding/previews/forms.svg" alt="Brightdesk Forms workspace design preview" width="100%"></p>

> **Visual example:** This is an original Brightdesk design preview showing the intended desktop workspace. It is an illustrative concept, not a screenshot of a completed release build.

Brightdesk Forms is a dedicated desktop application within the independent Brightdesk Office Suite. It uses the shared Brightdesk design language and opens directly into Forms.

## What it does

- Design and organise forms, surveys and quizzes.
- Collect responses locally.
- Work with the shared Brightdesk file, language and dictionary services.
- Use the same Brightdesk design language and desktop experience.

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

## Professional workspace examples and acceptance

Forms should make the full form-building journey easy to understand: build, preview, validate and review responses. The main example should show a realistic feedback or registration form with a sensible question order and a separate preview state.

### Example workflow

1. Create a feedback form with a title and short description.
2. Add required and optional questions using suitable answer types.
3. Preview the form as a respondent would see it.
4. Submit valid sample responses and test required-field validation.
5. Review the collected responses in a clear results view.

The editor should distinguish the form outline, selected question settings and respondent preview. Required fields, validation messages, save state and response counts must be clear. Do not imply online publishing or cloud collection where the release is local-first.

Follow the shared [Brightdesk visual and interaction standard](https://github.com/connormolloy12/Brightdesk-suite/blob/main/docs/BRIGHTDESK_VISUAL_STANDARD.md).

### Acceptance checks

- Question creation, reordering, preview and validation work as shown.
- Required/optional states and errors are accessible and understandable.
- Response review matches the responses actually stored.
- Examples distinguish local functionality from any future online service.
