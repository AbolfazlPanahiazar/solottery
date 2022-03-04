
import * as path from "path";
import * as fs from "fs";
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(contractPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

export const abi = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Lottery.sol"
]["Lottery"].abi;

export const evm = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Lottery.sol"
]["Lottery"].evm;

export default JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Lottery.sol"
]["Lottery"];