import assert from "assert";
import Web3 from "web3";
import { beforeEach, describe, it } from "mocha";
import { abi, evm } from "../compile";
import { Contract } from "web3-eth-contract";

const web3 = new Web3("ws://localhost:8545");

let lottory: Contract;
let accounts: string[];
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

  it("allows to sign up", async () => {
    await lottory.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.011", "ether"),
    });

    const players: string[] = await lottory.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
  });

  it("allows to multiple sign up", async () => {
    await lottory.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.011", "ether"),
    });

    await lottory.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.012", "ether"),
    });

    const players: string[] = await lottory.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(2, players.length);
  });

  it("requires min amount of ether to sign up", async () => {
    try {
      await lottory.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei("0.005", "ether"),
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("only owner can pick winer", async () => {
    try {
      await lottory.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
