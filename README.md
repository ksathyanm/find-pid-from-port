# find-pid-from-port

![Test windows status](https://github.com/ksathyanm/find-pid-from-port/workflows/test-windows/badge.svg)
![Test macOS status](https://github.com/ksathyanm/find-pid-from-port/workflows/test-macOS/badge.svg)
![Test linux status](https://github.com/ksathyanm/find-pid-from-port/workflows/test-linux/badge.svg)

[![npm version](https://badge.fury.io/js/find-pid-from-port.svg)](https://badge.fury.io/js/find-pid-from-port)
[![Node.js version](https://img.shields.io/node/v/find-pid-from-port)](https://nodejs.org/en/download/)
[![npm downloads](https://img.shields.io/npm/dm/find-pid-from-port)](https://www.npmjs.com/package/find-pid-from-port)
[![Minified size](https://img.shields.io/bundlephobia/min/find-pid-from-port)](https://bundlephobia.com/result?p=find-pid-from-port)
[![Known vulnerabilities](https://snyk.io/test/npm/find-pid-from-port/badge.svg)](https://snyk.io/test/npm/find-pid-from-port)

> Find the pid(s) of a process on a given port

## Install

```
$ npm install find-pid-from-port
```

## Usage

```js
const findPidFromPort = require("find-pid-from-port")

const example = async () => {
  try {
    const pids = await findPidFromPort(8017)
    console.log(pids.all)
    //=> [1234, 5678]

    console.log(pids.tcp)
    //=> [1234]

    console.log(pids.udp)
    //=> [5678]
  } catch (error) {
    console.log(error)
    //=> "Couldn't find a process with port `8017`"
  }
}
example()
```

## API

### findPidFromPort(port)

#### port

Type: `number`

Port to lookup.
