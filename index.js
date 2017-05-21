#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');

var fs = require('fs');
var exec = require('child_process').exec;


// Ethereum stuff
var Web3 = require('web3')

const TESTRPC_HOST = 'localhost'
const TESTRPC_PORT = '8545'

var address = ""
program
  .version('0.0.1')
  .arguments('<address>')
  .option('-e, --event <event>', 'The event name to watch for', '*')
  .option('-a, --abi <abi>', 'Path to the ABI definition')
  .option('-f, --from <from>', 'Block to watch from', 0)
  .option('-t, --to <to>', 'Block to watch until', 'latest')
  .option('-r, --rpc <rpc>', 'Address of RPC Ethereum Node', 'http://localhost:8545')
  // .option('-c, --command <command>', 'Command to run with event JSON as input', 'jq')
  .option('-s, --silent <silent>', 'Dont display non-json info on startup', false)
  .action(function(address) {
    watch_address = address
  })
  .parse(process.argv);

if(!program.silent)
{
  console.log(chalk.bold.red( `    Connected to: ${program.rpc}`))
  console.log(chalk.bold.cyan(`Watching address: ${watch_address}`))
  console.log(chalk.bold.cyan(`      From block: ${program.from}`))
  console.log(chalk.bold.cyan(`        To block: ${program.to}`))
  console.log(chalk.bold.cyan(`       for event: ${program.event}`))
  console.log(chalk.bold.cyan(`        with abi: ${program.abi}`))
}

var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(program.rpc));

var abi = JSON.parse(fs.readFileSync(program.abi, 'utf8'));
var contract = web3.eth.contract(abi)
var contract_instance = contract.at(watch_address)

function handle_event(error, result){
  // Should we respond to this event?
  if(program.event == '*' || result.event == program.event)
  {
    // Output json to console
    console.log(JSON.stringify(result))
  }
}

// Safety check this action name exists
if(program.event != "*" && contract_instance[program.event] == null)
{
  console.log(`${program.event} is not an Event defined in this ABI`)
}
else
{
  // Begin watching
  var event_being_watched
  event_being_watched = contract_instance.allEvents({}, {fromBlock: program.from, toBlock: program.to});

  event_being_watched.watch(handle_event);
}
