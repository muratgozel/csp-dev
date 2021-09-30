# csp-dev
Spec compliant content security policy builder and parser. 🚨

![NPM](https://img.shields.io/npm/l/csp-dev)
[![npm version](https://badge.fury.io/js/csp-dev.svg)](https://badge.fury.io/js/csp-dev)
![npm bundle size](https://img.shields.io/bundlephobia/min/csp-dev)
![npm](https://img.shields.io/npm/dy/csp-dev)

## Install
```sh
npm i -D csp-dev
```

## Use
### Build Policy
```js
const ContentSecurityPolicy = require('csp-dev')

const builder = new ContentSecurityPolicy()
builder.newDirective('script-src', ['self', 'unsafe-inline', 'nonce-2726c7f26c', '*.test.com'])
builder.newDirective('default-src', 'self')
builder.newDirective('style-src', 'data:')

// or by loading an object

const builder2 = new ContentSecurityPolicy()
builder2.load({
  'default-src': ['self'],
  'script-src': [
    'self', 'unsafe-inline', 'nonce-2726c7f26c', '*.test.com'
  ],
  'style-src': ['data:']
})
```
### Parse Policy Data
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
### Share
Share data as **json**, spec compliant csp **string** or **html** meta tag:
```js
parser.share('json')
`
{
  'default-src': ['self'],
  'script-src': [
    'self', 'unsafe-inline', 'nonce-2726c7f26c', '*.test.com'
  ],
  'style-src': ['data:']
}
`

parser.share('string')
`
default-src 'self'; script-src 'self' 'unsafe-inline' 'nonce-2726c7f26c' *.test.com; style-src data:
`

parser.share('html')
`
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'nonce-2726c7f26c' *.test.com; style-src data:">
`
```

## Tests
See `spec` folder for tests. I'll expand the test suite as I update the library. You can run tests by `npm run test`

## Notes
The reporting feature of csp hasn't been implemented. I haven't get fully understand but I think there is no accepted standart to it for now.

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀
