# Prism Status

A Prism-native public status dashboard for viewing public PluralKit fronting data.

This repository is forked from [fulmine/pluralkit-xyz](https://codeberg.org/fulmine/pluralkit-xyz),
a small website for viewing public PluralKit information. The upstream project is
MIT licensed and is not affiliated with PluralKit. Prism Status keeps upstream
history intact and tracks the original project through the `upstream` git remote.

Currently this supports viewing...

- system info
- system list
- system front
- member info

With some small other things here and there. I plan on adding support for groups eventually™.

Note that this project was started when I didn't really know what I was doing yet. Code quality might suffer in some areas because of this. I've been working on cleaning stuff up, this takes priority over new features.

## Contributing

**Important:** While the Codeberg repo is a mirror of https://git.pals.gay/fulmine/pluralkit-xyz, contributing is still done over on Codeberg.

This project uses [sveltekit](https://kit.svelte.dev/). `pnpm` and `nodejs` (>=18.13) are required. Use `pnpm dev` to start a development server. Use `pnpm build` to build for production.

## Running in Docker

Make sure to set the following ENV variables when running with Docker:

- `ORIGIN` to your hostname, including the protocol (`https://status.prismplural.com` for Prism deployments)
