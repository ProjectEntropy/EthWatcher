# ⏅EthWatcher

◎ Know thyself for to not will leave thy confused


### Introduction

This thing watches an ethereum address for Events, then returns them to STDOUT ready for piping to other commands, like TWITTER or Secure Scuttlebutt

### Watch all events

```
$ ethwatcher "0x0c63ed1bd515e82a5075abf240184e15d59ba0f2" --abi ./example_abi.js

Connected to: http://localhost:8545
Watching address: 0x0c63ed1bd515e82a5075abf240184e15d59ba0f2
  From block: 0
    To block: latest
   for event: *
    with abi: ./example_abi.js

{"logIndex":0,"transactionIndex":0,"transactionHash":"0xd643a985a7b2335845c98f5767f130fbfc8cf2833776e44b0f6d3a9f89b3c368","blockHash":"0x731ced4df065a45439c3865ae32786671bae1fca71479882af98a957c19885e8","blockNumber":7,"address":"0x0c63ed1bd515e82a5075abf240184e15d59ba0f2","type":"mined","event":"ActionAdded","args":{"actionID":"1","amount":"0","description":"Bind Ethereum events to Secure Scuttlebutt posts"}}
```


### Process JSON of specific events

requires `jq`

```
$ ethwatcher "0x0c63ed1bd515e82a5075abf240184e15d59ba0f2" --event "ActionAdded" --abi ./example_abi.js --silent true | jq -r '.args'

{
  "actionID": "0",
  "amount": "0",
  "description": "test"
}
{
  "actionID": "1",
  "amount": "0",
  "description": "Bind Ethereum events to Secure Scuttlebutt posts"
}
```

### Post to Scuttlebutt on new event

```
$ ethwatcher "0x0c63ed1bd515e82a5075abf240184e15d59ba0f2" --event "ActionAdded" --abi ./example_abi.js --silent true | jq -r '.args.description' |
```
