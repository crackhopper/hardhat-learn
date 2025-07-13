// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

contract Contract1 is BaseContract {
    constructor() payable BaseContract(){
        
    }
    receive() external payable {
        // emit ReceivedETH("received");
        emit ReceivedETH2(msg.sender, msg.value, "received");
    }
    fallback() external payable {
        // emit ReceivedETH("fallback");
        emit ReceivedETH2(msg.sender, msg.value, "fallback");
    }
}