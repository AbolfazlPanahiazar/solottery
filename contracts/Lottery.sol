// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function pickWiner() public {
        uint256 index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
    }
}
