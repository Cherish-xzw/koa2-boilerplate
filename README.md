# Koa2 Boilerplate

A simple koa2 boilerplate based on webpack3.

## Features

This is a koa2 starter boilerplate app I've put together using the following technologies:

✓ [koa v2](https://github.com/koajs/koa)

✓ [webpack(v3)](https://github.com/webpack/webpack)

✓ [ES2015+](http://babeljs.io/docs/learn-es2015/)

✓ [Babel](http://babeljs.io/)

✓ [SCSS](http://sass-lang.com/)

✓ [Hot reload](https://github.com/leecade/koa-webpack-middleware)

✓ [Eslint](https://github.com/eslint/eslint)

✓ [pre-commit](https://github.com/observing/pre-commit)

R
## Usage

**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer and
[npm](https://github.com/npm/npm) installed on your development machine.

* node `^6.3.0`
* npm `^5.0.0`

**Step 2**. Clone this repository

```shell
$ git clone http://gitlab.whup.com/UPOem-WebApplication/koa2-boilerplate.git MyApp
$ cd MyApp
$ npm install        # Install project dependencies listed in package.json
```

If you just want to start a new project without the `koa2 boilerplate` commit history then you can do:

```bash
$ git clone --depth=1 http://gitlab.whup.com/UPOem-WebApplication/koa2-boilerplate.git MyApp
```
The depth=1 tells git to only pull down one commit worth of historical data.

**Step 3**. Compile and launch your app by running:

```shell
$ npm run dev  # Compiles the app and start server with "hot reload"
```

Now the app should be running at [http://0.0.0.0:3000/](http://0.0.0.0:3000/)


## Build
A `build` script to bundle JS, CSS, and images for production, with sourcemaps.

```
$ npm run build
```

## Test

```
$ npm test
$ npm run test:cover # running test with coverage
```

## Release
`release` script can bundle everything we need to publish our code to productiion environment.

```
$ npm run release
```
**Note:** This is script can only running at *nix-like commmand line.

## Scripts

|`npm <script>`     |Description|
|-------------------|-----------|
|`dev`              |Serves your app at `localhost:3000`|
|`start`             |Serves your app with production mode|
|`build`            |Builds the static assets|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`release`          |Publish to production environment


## Wiki

- [koa2-boilerplate](http://gitlab.whup.com/UPOem-WebApplication/koa2-boilerplate/wikis/home#koa-boilerplate)


## Problem

> Can't install node-sass ?

put this lines in you ~/.npmrc file and ` npm install ` again.

```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
electron_mirror=http://npm.taobao.org/mirrors/electron/
```
