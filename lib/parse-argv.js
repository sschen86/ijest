module.exports = function parseArgv () {
  const params = {}
  process.argv.forEach(arg => {
    const matches = arg.match(/^-(-)?(\w+)(?:=(.+))?/)
    if (matches) {
      const [ , isFully, key, value = '' ] = matches
      params[key] = { isFully: !!isFully, value: value.split(/\s*,\s*/) }
    }
  })
  return params
}
