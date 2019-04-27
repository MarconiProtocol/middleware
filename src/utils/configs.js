const fs = require('fs')

const CONF_FILE = '/opt/marconi/etc/middleware/middleware_conf.json'

function GetConfig() {
  configFile = fs.readFileSync(CONF_FILE, 'utf8')
  return JSON.parse(configFile)
}

function GetServerConfig() {
  return GetConfig().server
}

function GetMethConfig() {
  return GetConfig().meth
}

module.exports = {
  GetServerConfig,
  GetMethConfig,
}
