// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "./ApCoin.sol";

contract StakingLogic1 {
    address a;
    ApCoin ap;
    uint public totalStaked;
    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public userRewards;
    mapping(address => uint) public stakedTime;

    constructor() {
        ap = new ApCoin(address(this));
    }

    function stake(uint amount, uint _time) public payable {
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value == amount, "Amount must be equal to msg.value");
        totalStaked += amount;
        stakedBalance[msg.sender] += amount;
        stakedTime[msg.sender] = _time;
        if (_time > 7 days) {
            userRewards[msg.sender] += 10;
            ap.mint(msg.sender, 10);
        }
    }

    function unstake(uint amount) public payable {
        require(amount <= stakedBalance[msg.sender], "Not enough balance");
        require(
            block.timestamp > stakedTime[msg.sender],
            "Staking period is not over"
        );
        totalStaked -= amount;
        stakedBalance[msg.sender] -= amount;
        stakedTime[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
