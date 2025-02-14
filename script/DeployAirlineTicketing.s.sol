// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";
import "../src/AirlineTicketing.sol";

contract DeployAirlineTicketing is Script {
    function run() external {
        vm.startBroadcast();
        new AirlineTicketing();
        vm.stopBroadcast();
    }
}
