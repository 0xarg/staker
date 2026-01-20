// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "../src/Staking.sol";
import "../src/StakeX.sol";

contract StakingTest is Test {
    Staking staking;
    StakeX rewardToken;

    address owner = address(this);
    address alice = address(0xA11CE);

    function setUp() public {
        //Deploy the reward token;
        rewardToken = new StakeX();

        //Deploy Implementation;
        Staking impl = new Staking();

        // Encode initializer:
        bytes memory data = abi.encodeCall(
            Staking.initialize,
            (address(rewardToken))
        );

        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), data);

        staking = Staking(address(proxy));
        rewardToken.transferOwnership(address(staking));

        vm.deal(alice, 10 ether);
    }

    function testStake() public {
        vm.prank(alice);
        staking.stake{value: 1 ether}(7 days);

        assertEq(staking.totalStaked(), 1 ether);
    }

    function testUnStake() public {
        vm.prank(alice);
        staking.stake{value: 1 ether}(0 days);
        assertEq(staking.totalStaked(), 1 ether);
        assertEq(staking.unStakeTime(alice), block.timestamp + 0 days);
        vm.prank(alice);
        staking.unstake();
        assertEq(staking.totalStaked(), 0 ether);
    }
}
