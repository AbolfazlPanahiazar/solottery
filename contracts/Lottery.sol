// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract Lottery {
    address public manager;

    constructor() {
        manager = msg.sender;
    }
}