// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

contract Contract1 is BaseContract {
    constructor() payable BaseContract(){
        
    }
    receive() external payable {
        emit ReceivedETH("received");
    }
    fallback() external payable {
        emit ReceivedETH("fallback");
    }
}