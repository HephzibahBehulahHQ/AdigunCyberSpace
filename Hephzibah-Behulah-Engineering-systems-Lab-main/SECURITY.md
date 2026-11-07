# Security Policy

## Scope

This repository is a public GitHub Pages website. Public HTML, CSS, JavaScript, images, educational content, and client-side game logic are intentionally visible.

## Never commit secrets

Do not commit passwords, API keys, access tokens, private certificates, service credentials, database credentials, or other secrets to this repository. GitHub Pages is a static public site, so anything shipped to the browser must be treated as public.

If a third-party service requires a secret, use a server-side service or another architecture that keeps the credential outside the published site.

## Reporting a security issue

Please do not publish sensitive security details in a public issue. Contact the repository owner privately through GitHub before disclosing the issue publicly.

## Safe development rules

- Keep the `main` branch deployable.
- Run the repository JavaScript QA before merging changes.
- Treat browser-side data as public.
- Avoid storing personal data in localStorage unless it is strictly necessary and non-sensitive.
- Do not add executable third-party scripts without reviewing their source and integrity implications.
