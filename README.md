# Prism Fronters

A Prism-native public dashboard for viewing public PluralKit fronting data.

This repository is forked from [fulmine/pluralkit-xyz](https://codeberg.org/fulmine/pluralkit-xyz),
a small website for viewing public PluralKit information. The upstream project is
MIT licensed and is not affiliated with PluralKit. Prism Fronters keeps upstream
history intact and tracks the original project through the `upstream` git remote.

## Scope

Prism Fronters reads public PluralKit API responses and renders them with Prism's
design language. It does not implement Discord auth, PluralKit token storage, or
Prism's future encrypted sharing model.

Currently this supports viewing:

- current public front for a system
- recent public fronting history

## Development

This project uses SvelteKit. `pnpm` and Node.js are required.

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
```

## Docker

Set `ORIGIN` to the deployed hostname, including the protocol.

```sh
ORIGIN=https://fronters.prismplural.com
```
