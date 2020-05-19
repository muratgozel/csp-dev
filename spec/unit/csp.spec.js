const ContentSecurityPolicy = require('../../src')
const builder = new ContentSecurityPolicy()
const parser = new ContentSecurityPolicy()

const str = "script-src 'self' 'unsafe-inline' 'nonce-2726c7f26c' *.test.com; default-src 'self'; style-src data:"
const html = '<meta http-equiv="Content-Security-Policy" content="' + str + '">'
const obj = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'", "'unsafe-inline'", "'nonce-2726c7f26c'", "*.test.com"
  ],
  'style-src': ['data:']
}

describe('CSP Parser', function() {
  it('parse.', function() {
    const data = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'nonce-2726c7f26c' *.test.com;
    style-src data:
    `
    const parser = new ContentSecurityPolicy(data)
    expect(parser.state.data).toEqual(obj)
    expect(parser.valid()).toBe(true)

    const invaliddata = 'asdasd qwwee'
    const parser2 = new ContentSecurityPolicy(invaliddata)
    expect(parser2.valid()).toBe(false)
  })
})

describe('CSP Builder', function() {
  it('accepts directives.', function() {
    const builder = new ContentSecurityPolicy()
    builder.newDirective('script-src', ['self', 'unsafe-inline', 'nonce-2726c7f26c', '*.test.com'])
    builder.newDirective('default-src', 'self')
    builder.newDirective('style-src', 'data:')

    expect(builder.state.data).toEqual(obj)
    expect(builder.valid()).toBe(true)
  })
})

describe('Share', function() {
  const builder = new ContentSecurityPolicy()
  builder.newDirective('script-src', ['self', 'unsafe-inline', 'nonce-2726c7f26c', '*.test.com'])
  builder.newDirective('default-src', 'self')
  builder.newDirective('style-src', 'data:')

  it('exports as json', function() {
    expect(builder.share('json')).toEqual(obj)
  })
  it('exports as string', function() {
    expect(builder.share('string')).toEqual(str)
  })
  it('exports as html', function() {
    expect(builder.share('html')).toEqual(html)
  })
})
