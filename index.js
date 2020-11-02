const util = require("util")
const condense = require("selective-whitespace")
const execAsync = util.promisify(require("child_process").exec)

const isWindows = process.platform === "win32"

const command = (port) => {
  if (isWindows) {
    return `netstat.exe -a -n -o | findstr.exe :${port}`
  }
  return `lsof -i :${port}`
}

const netstats = async (port) => {
  const cmd = command(port)
  const { stdout } = await execAsync(cmd)
  return stdout.split("\n")
}

const pushTo = (target, item) => {
  if (item !== "" && typeof item === "number" && item !== 0 && target.indexOf(item) === -1) {
    target.push(item)
  }
}

const processNetStats = async (stats) => {
  const pidIndex = 1
  const pids = {
    all: [],
    tcp: [],
    udp: [],
  }
  const items = isWindows ? stats : stats.slice(1)
  for (const item of items) {
    const values = condense(item).split(" ")
    const pid = isWindows ? parseInt(values.pop(), 10) : parseInt(values[pidIndex], 10)
    if (values.length > 1) {
      if (values.indexOf("TCP") !== -1) {
        pushTo(pids.tcp, pid)
        pushTo(pids.all, pid)
      } else if (values.indexOf("UDP") !== -1) {
        pushTo(pids.udp, pid)
        pushTo(pids.all, pid)
      }
    }
  }
  return pids
}

module.exports = async (port) => {
  if (typeof port !== "number") {
    throw new TypeError("Expected a port number")
  }
  try {
    const stats = await netstats(port)
    const pids = await processNetStats(stats)
    return pids
  } catch (error) {
    throw new Error(`Couldn't find a process with port \`${port}\``)
  }
}
