pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingProxy is Ownable {
    uint public totalStaked;
    mapping(address => uint) public stakedBalance;

    address public implementation;

    constructor(address _implementation) Ownable(msg.sender) {
        implementation = _implementation;
    }

    function setImplementation(address _implementation) public onlyOwner {
        implementation = _implementation;
    }

    fallback() external payable {
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "DelegateCall failed");
    }

    receive() external payable {
        (bool success, ) = implementation.delegatecall("");
        require(success, "DelegateCall failed");
    }
}
