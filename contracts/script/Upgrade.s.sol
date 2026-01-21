// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Staking} from "../src/Staking.sol";
import {StakingV2} from "../src/StakingV2.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {console} from "../lib/forge-std/src/console.sol";

contract Upgrade is Script {
    function run() external returns (address) {
        address mostRecentlyDeployedProxy = DevOpsTools
            .get_most_recent_deployment("ERC1967Proxy", block.chainid);

        vm.startBroadcast();
        StakingV2 newAddy = new StakingV2(); //gets the address of contractB
        vm.stopBroadcast();
        address proxy = upgradeAddress(
            mostRecentlyDeployedProxy,
            address(newAddy)
        ); //upgrades contractA to contractB
        return proxy;
    }

    function upgradeAddress(
        address proxyAddress,
        address newAddy
    ) public returns (address) {
        uint256 key = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(key);
        Staking proxy = Staking(payable(proxyAddress)); //we want to make a function call on this address
        console.log("New implementation:", address(newAddy));
        proxy.upgradeToAndCall(address(newAddy), new bytes(0)); //proxy address now points to this new address
        console.log("Proxy Upgrded");
        vm.stopBroadcast();
        return address(proxy);
    }
}
