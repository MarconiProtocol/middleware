const fs = require('fs')

const CONF_FILE = '/opt/marconi/etc/middleware/middleware_conf.json'
const USER_CONF_FILE = '/opt/marconi/etc/middleware/user_conf.json'

function CreateDefaultUserConfig() {
  let data = "{\n" +
    "  \"meth\": {\n" +
    "    \"UserAddress\": \"0x0000000000000000000000000000000000000000\"\n" +
    "  }\n" +
    "}\n"
  fs.writeFileSync(USER_CONF_FILE, data, function (err) {
    if (err) throw err;
  })
}

function GetConfig() {
  configFile = fs.readFileSync(CONF_FILE, 'utf8')
  return JSON.parse(configFile)
}

function GetUserConfig() {
  if (!fs.existsSync(USER_CONF_FILE)) {
    CreateDefaultUserConfig();
  }
  configFile = fs.readFileSync(USER_CONF_FILE, 'utf8')
  return JSON.parse(configFile)
}

function GetMarconiConfig() {
  return GetConfig().marconid
}

function GetServerConfig() {
  return GetConfig().server
}

function GetMethConfig() {
  return GetConfig().meth
}

function GetUserMethConfig() {
  return GetUserConfig().meth
}

function UpdateUserAddress(userAddress) {
  let data = "{\n" +
    "  \"meth\": {\n" +
    "    \"UserAddress\": \"" + userAddress + "\"\n" +
    "  }\n" +
    "}\n";
  fs.writeFileSync(USER_CONF_FILE, data, function (err) {
    if (err) throw err;
  })
}

module.exports = {
  GetServerConfig,
  GetMarconiConfig,
  GetMethConfig,
  GetUserMethConfig,
  UpdateUserAddress,
}
