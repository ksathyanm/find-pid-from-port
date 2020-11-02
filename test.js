/* eslint-env mocha */
const http = require("http")
const chai = require("chai")
chai.use(require("chai-as-promised"))
const expect = chai.expect

const findPidFromPort = require("./index.js")

describe("find-pid-from-port", () => {
  describe("expectations", () => {
    it("expects a port number", () => {
      expect(findPidFromPort({})).to.eventually.be.rejectedWith(TypeError, "Expected a port number")
    })

    it("throws error on invalid port", async () => {
      expect(findPidFromPort(-1)).to.eventually.be.rejectedWith(Error, "Couldn't find a process with port `-1`")
    })
  })

  describe("gets the pids", () => {
    let server
    let port

    beforeEach(() => {
      server = http.createServer()
      port = server.listen().address().port
    })

    it("gets the pids", async () => {
      const pids = await findPidFromPort(port)
      expect(pids.all).to.have.lengthOf.at.least(1)
      expect(pids.all[0]).to.be.a("number")
      expect(pids.tcp).to.have.lengthOf.at.least(1)
      expect(pids.tcp[0]).to.be.a("number")
    })

    afterEach(() => {
      server.close()
    })
  })

  describe("no duplicates", () => {
    let server
    let port

    beforeEach(() => {
      server = http.createServer()
      port = server.listen().address().port
    })

    it("doesn't push duplicate entries", async () => {
      const pids = await findPidFromPort(port)
      expect(pids.all).to.have.members([...new Set(pids.all)])
      expect(pids.tcp).to.have.members([...new Set(pids.tcp)])
      expect(pids.udp).to.have.members([...new Set(pids.udp)])
    })

    afterEach(() => {
      server.close()
    })
  })
})
