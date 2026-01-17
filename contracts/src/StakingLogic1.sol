// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract StakingLogic1 {
    address a;
    uint public totalStaked;
    mapping(address => uint) public stakedBalance;

    function stake(uint amount) public payable {
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value == amount, "Amount must be equal to msg.value");
        totalStaked += amount;
        stakedBalance[msg.sender] += amount;
    }

    function unstake(uint amount) public payable {
        require(amount <= stakedBalance[msg.sender], "Not enough balance");
        totalStaked -= amount;
        stakedBalance[msg.sender] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
