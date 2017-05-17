#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');

program
.arguments('<contract_address>')
.option('-e, --event <event>', 'The event name to watch for')
.option('-a, --abi <abi>', 'Path to the ABI definition')
.action(function(address) {
  console.log(console.log(chalk.bold.cyan(`Watching address: ${address}`)))
})
.parse(process.argv);
