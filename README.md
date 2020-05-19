# csp-dev
Content security policy builder and parser. 🚨

![NPM](https://img.shields.io/npm/l/csp-dev)
[![npm version](https://badge.fury.io/js/csp-dev.svg)](https://badge.fury.io/js/csp-dev)
![npm bundle size](https://img.shields.io/bundlephobia/min/csp-dev)
![npm](https://img.shields.io/npm/dy/csp-dev)

## Install
```sh
npm i -D csp-dev
```

## Use
Build:
```js
const ContentSecurityPolicy = require('csp-dev')

const builder = new ContentSecurityPolicy()
builder.newDirective('script-src', ['self', 'unsafe-inline', 'nonce-2726c7f26c', '*.trusted.com'])
builder.newDirective('default-src', 'self')
builder.newDirective('style-src', 'data:')

// or by loading an object

const builder2 = new ContentSecurityPolicy()
builder2.load({
  'default-src': ['self'],
  'script-src': [
    'self', 'unsafe-inline', 'nonce-2726c7f26c', '*.trusted.com'
  ],
  'style-src': ['data:']
})
```
Parse:
```js
const ContentSecurityPolicy = require('csp-dev')

const data = `
default-src 'self';
script-src 'self' 'unsafe-inline' 'nonce-2726c7f26c' *.test.com;
style-src data:
`
const parser = new ContentSecurityPolicy(data)

parser.valid() // true|false
```
Share:
```js
parser.share('json'|'string')
```

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
