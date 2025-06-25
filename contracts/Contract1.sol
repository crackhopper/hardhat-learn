// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

contract Contract1 is BaseContract {
    receive() external payable {
        emit ReceivedETH(msg.sender, msg.value, "received");
    }
    fallback() external payable {
        emit ReceivedETH(msg.sender, msg.value, "fallback");
    }
}