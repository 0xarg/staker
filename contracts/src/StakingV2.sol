// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./StakeX.sol";

contract StakingV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 public totalStaked;

    mapping(address => uint256) public stakeBalance;
    mapping(address => uint256) public unStakeTime;
    mapping(address => uint256) public userRewards;
    mapping(address => uint256) public lastUpdated;

    StakeX public rewardToken;

    uint256[50] private __gap;

    function initialize(address _rewardToken) public initializer {
        __Ownable_init(msg.sender);
        rewardToken = StakeX(_rewardToken);
    }

    function _updateReward(address user) internal {
        uint256 staked = stakeBalance[user];
        if (staked == 0) {
            lastUpdated[user] = block.timestamp;
            return;
        }

        uint256 timeElapsed = block.timestamp - lastUpdated[user];
        uint256 reward = (staked * timeElapsed * 1e18) / (1e14 * 1 days);
        userRewards[user] += reward;
        lastUpdated[user] = block.timestamp;
    }

    function claimReward() external {
        require(
            block.timestamp >= unStakeTime[msg.sender],
            "lock not finished"
        );
        _updateReward(msg.sender);

        uint256 reward = userRewards[msg.sender];
        require(reward > 0, "No claimable reward yet");
        userRewards[msg.sender] = 0;
        rewardToken.mint(msg.sender, reward);
    }

    function stake(uint256 lockDuration) external payable {
        require(msg.value > 0, "Zero Stake");
        // require(lockDuration >= 7,"lock duration min be 7 days,")'
        _updateReward(msg.sender);
        totalStaked += msg.value;
        stakeBalance[msg.sender] += msg.value;
        uint256 newUnlock = block.timestamp + lockDuration;

        if (newUnlock > unStakeTime[msg.sender]) {
            unStakeTime[msg.sender] = block.timestamp + lockDuration;
        }
    }

    function unstake() external payable {
        require(block.timestamp >= unStakeTime[msg.sender], "Locked");
        uint256 amount = stakeBalance[msg.sender];
        _updateReward(msg.sender);
        stakeBalance[msg.sender] = 0;
        totalStaked -= amount;
        unStakeTime[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Eth Unstake Transfer failed");
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
