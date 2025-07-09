// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

contract Contract3 is BaseContract {
    constructor() payable BaseContract(){
        
    }    
    fallback() external {
        emit ReceivedETH("fallback not payable");
    }
}
