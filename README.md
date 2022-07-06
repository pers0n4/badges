# Badges

[![Shields.io]](https://shields.io/)
[![Simple Icons]](https://simpleicons.org/)

> Custom endpoint for [shields.io](https://shields.io/)

## Usage

It automatically makes badges for my use cases.

```markdown
e.g. to make GitHub badge

[github]: https://img.shields.io/endpoint?url=https://badges.deno.dev/GitHub

will be converted to

[github]: https://img.shields.io/static/v1?style=flat-square&logo=github&label=&message=GitHub&logoColor=181717&labelColor=f5f5f5de&color=181717
```

## Prerequisites

- [Deno](https://deno.land/)

## Commands

```shell
# run server
deno run --allow-net [--watch] app.ts

# cache dependencies
deno cache *.ts

# test
deno test
```

## LICENSE

[![LICENSE]](./LICENSE)

[shields.io]: https://img.shields.io/endpoint?url=https://badges.deno.dev/Shields.io
[simple icons]: https://img.shields.io/endpoint?url=https://badges.deno.dev/?message=Simple%2BIcons
[license]: https://img.shields.io/github/license/pers0n4/badges?style=for-the-badge&color=181717
