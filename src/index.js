function ContentSecurityPolicy(data) {
  this.state = {
    data: {},
    valid: false
  }
  this.validShareFormats = ['json', 'string', 'html']

  this.validDirectives = [
    'child-src', 'connect-src', 'default-src', 'font-src', 'frame-src',
    'img-src', 'manifest-src', 'media-src', 'object-src', 'script-src',
    'style-src', 'base-uri', 'plugin-types', 'sandbox', 'form-action',
    'frame-ancestors', 'block-all-mixed-content', 'upgrade-insecure-requests'
  ]
  this.quoteSources = [
    'self', 'unsafe-inline', 'unsafe-eval', 'unsafe-hashes', 'none', 'strict-dynamic'
  ]
  this.quoteSourceByPrefix = [
    'nonce', 'sha256', 'sha512', 'sha384'
  ]

  if (typeof data == 'string') this.parse(this.clean(data))
}

ContentSecurityPolicy.prototype.load = function load(obj) {
  this.state.data = obj
  this.state.valid = true
  return this
}

ContentSecurityPolicy.prototype.newDirective = function newDirective(name, arr) {
  if (this.validDirectives.indexOf(name) === -1)
    throw new Error('Invalid directive. '+name+' is not a valid csp directive.')

  arr = !Array.isArray(arr) ? [arr] : arr
  const quoteSources = this.quoteSources
  const quoteSourceByPrefix = this.quoteSourceByPrefix
  const sources = arr.map(function(source) {
    const quote1 = quoteSources.indexOf(source)
    const quote2 = quoteSourceByPrefix.filter(pre => source.slice(0, pre.length) == pre)
    const needsQuoting = quote1 !== -1 || (Array.isArray(quote2) && quote2.length > 0)
    return needsQuoting ? "'" + source + "'" : source
  })

  this.state.data[name] = sources
  this.state.valid = true

  return this
}

ContentSecurityPolicy.prototype.share = function share(format) {
  if (this.validShareFormats.indexOf(format) === -1)
    throw new Error('Unsupported sharing format. Supported share formats are '+this.validShareFormats.join(', ')+' but you specified ' + format + '.')

  if (format == 'json') return this.state.data

  const str = this.dump()
  return format == 'html' ? '<meta http-equiv="Content-Security-Policy" content="' + str + '">' : str
}

ContentSecurityPolicy.prototype.dump = function dump() {
  const self = this
  const csp = self.state.data

  return Object
    .keys(csp)
    .reduce(function(memo, directive) {
      if (self.validDirectives.indexOf(directive) !== -1 && Array.isArray(csp[directive])) {
        memo.push(
          directive + ' ' +
            csp[directive]
              .map(function(source) {
                const quote1 = self.quoteSources.indexOf(source)
                const quote2 = self.quoteSourceByPrefix.filter(pre => source.slice(0, pre.length) == pre)
                const needsQuoting = quote1 !== -1 || (Array.isArray(quote2) && quote2.length > 0)
                return needsQuoting ? "'" + source + "'" : source
              })
              .join(' ')
        )
      }
      return memo
    }, [])
    .join('; ')
}

ContentSecurityPolicy.prototype.parse = function parse(data) {
  const validDirectives = this.validDirectives
  const quoteSources = this.quoteSources
  const quoteSourceByPrefix = this.quoteSourceByPrefix

  const directives = data.split(';').map(d => this.clean(d))
  this.state.data = directives.reduce(function(memo, directive) {
    const arr = directive.split(' ').filter(item => item.length > 0)
    if (validDirectives.indexOf(arr[0]) !== -1) {
      memo[arr[0]] = arr.filter((item, ind) => ind > 0).map(function(source) {
        const quote1 = quoteSources.indexOf(source)
        const quote2 = quoteSourceByPrefix.filter(pre => source.slice(0, pre.length) == pre)
        const needsQuoting = quote1 !== -1 || (Array.isArray(quote2) && quote2.length > 0)
        return needsQuoting ? "'" + source + "'" : source
      })
    }
    return memo
  }, {})

  if (Object.keys(this.state.data).length > 0) this.state.valid = true

  return this
}

ContentSecurityPolicy.prototype.valid = function valid() {
  return this.state.valid
}

ContentSecurityPolicy.prototype.clean = function clean(data) {
  data = data.replace(/^[\r\n\s]+/g, '')
  data = data.replace(/[\r\n\s]+$/g, '')
  data = data.replace(/[\r\n]+/gm, ' ')
  return data
}

module.exports = ContentSecurityPolicy
