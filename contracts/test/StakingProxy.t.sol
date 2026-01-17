// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/StakingLogic1.sol";
import "../src/StakingProxy.sol";

// contract StakingProxyTest is Test {
//     StakingLogic1 logic;
//     StakingProxy proxy;

//     address bob = address(0xB0B);

//     function setUp() public {
//         logic = new StakingLogic1();
//         proxy = new StakingProxy(address(logic));

//         vm.deal(alice, 10 ether);
//         vm.deal(bob, 10 ether);
//     }

//     function testStakeViaProxy() public {
//         vm.prank(alice);

//         // Call stake THROUGH proxy
//         StakingLogic1(address(proxy)).stake{value: 1 ether}(1 ether);

//         // Read state THROUGH proxy
//         uint256 total = StakingLogic1(address(proxy)).totalStaked();
//         uint256 aliceStake = StakingLogic1(address(proxy)).stakedBalances(
//             alice
//         );

//         assertEq(total, 1 ether);
//         assertEq(aliceStake, 1 ether);
//     }

//     function testUnstakeViaProxy() public {
//         vm.startPrank(alice);

//         StakingLogic1(address(proxy)).stake{value: 4 ether}(4 ether);
//         StakingLogic1(address(proxy)).unstake(1 ether);

//         vm.stopPrank();

//         assertEq(StakingLogic1(address(proxy)).stakedBalances(alice), 3 ether);

//         assertEq(alice.balance, 7 ether);
//     }

//     function testMultipleUsers() public {
//         vm.prank(alice);
//         StakingLogic1(address(proxy)).stake{value: 1 ether}(1 ether);

//         vm.prank(bob);
//         StakingLogic1(address(proxy)).stake{value: 2 ether}(2 ether);

//         assertEq(StakingLogic1(address(proxy)).totalStaked(), 3 ether);
//     }

//     function testRevertOnWrongAmount() public {
//         vm.prank(alice);
//         vm.expectRevert("Amount must be equal to msg.value");
//         StakingLogic1(address(proxy)).stake{value: 1 ether}(2 ether);
//     }
// }

contract StakingProxyTest is Test {
    StakingProxy proxy;
    StakingLogic1 logic;
    //     address alice = address(0xA11CE);

    address anurag = address(0xA11);
    address ashish = address(0xB0B);

    function setUp() public {
        logic = new StakingLogic1();
        proxy = new StakingProxy(address(logic));

        vm.deal(anurag, 10 ether);
        vm.deal(ashish, 10 ether);
    }

    function testStake() public {
        vm.prank(anurag);

        StakingLogic1(address(proxy)).stake{value: 1 ether}(1 ether);
        uint total = StakingLogic1(address(proxy)).totalStaked();
        uint anuragStake = StakingLogic1(address(proxy)).stakedBalance(anurag);

        assertEq(anuragStake, 1 ether);
        assertEq(total, 1 ether);
    }

    function testUnstake() public {
        vm.startPrank(anurag);
        StakingLogic1(address(proxy)).stake{value: 6 ether}(6 ether);
        StakingLogic1(address(proxy)).unstake(3 ether);
        vm.stopPrank();

        assertEq(StakingLogic1(address(proxy)).totalStaked(), 3 ether);
        assertEq(StakingLogic1(address(proxy)).stakedBalance(anurag), 3 ether);
        assertEq(anurag.balance, 7 ether);
    }
}
