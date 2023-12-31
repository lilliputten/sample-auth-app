<!--
@since 2023.10.06, 17:12
@changed 2023.10.06, 17:12
-->

# sample-auth-app

- Version: 0.0.2
- Last changes timestamp: 2023.10.07, 20:50 GMT+7

## See also

- [CHANGELOG.md](CHANGELOG.md)
- [TODO.md](TODO.md)

## Client & server

- Repository: https://github.com/lilliputten/sample-auth-app
- Demo server (with recent build published): https://sample-auth-app.lilliputten.ru/

## Install

Install all required node dependencies:

```
npm i
```

## Start dev server

Start dev server (locate in browser with `http://localhost:3000`):

```
npm run start
```

## Make build

```
npm run build
```

## Build and publish

For success publishing the deploy environment should be propeply set up (see
npm script command `postinstall-publish-submodule`).

```
npm run build-and-publish
```

To just publish previously created build:

```
npm run publish
```

Builds published into the `publish` branch. See utilities configuration in `utils/config.sh`.

## Deploy server

Actual publish branch is automatically deplolying to the server:

https://sample-auth-app.lilliputten.ru/
