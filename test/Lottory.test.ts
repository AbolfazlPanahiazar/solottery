import assert from "assert";
import Web3 from "web3";
import { beforeEach, describe, it } from "mocha";
import { abi, evm } from "../compile";
import { Contract } from "web3-eth-contract";
const ganache = require("ganache");

const web3 = new Web3("ws://localhost:8545");

let lottory: Contract;
let accounts;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottory = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
    })
    .send({ gas: 1000000, from: accounts[0] });
});

describe("Lottoty", () => {
  it("deploys a contract", () => {
    assert.ok(lottory.options.address);
  });
});
