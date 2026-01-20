// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "../src/Staking.sol";
import "../src/StakeX.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);

        // 1. Deploy reward token
        StakeX rewardToken = new StakeX();
        console.log("ApCoin deployed at:", address(rewardToken));

        // 2. Deploy staking implementation
        Staking stakingImpl = new Staking();
        console.log(
            "Staking implementation deployed at:",
            address(stakingImpl)
        );

        // 3. Encode initializer call
        bytes memory data = abi.encodeCall(
            Staking.initialize,
            (address(rewardToken))
        );

        // 4. Deploy ERC1967 proxy
        ERC1967Proxy proxy = new ERC1967Proxy(address(stakingImpl), data);

        Staking staking = Staking(address(proxy));
        console.log("Staking proxy deployed at:", address(staking));

        // 5. Transfer token ownership to staking proxy
        rewardToken.transferOwnership(address(staking));
        console.log("ApCoin ownership transferred to staking proxy");

        vm.stopBroadcast();
    }
}
