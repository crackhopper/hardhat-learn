// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

contract Contract3 is BaseContract {
    fallback() external {
        emit ReceivedETH(msg.sender, 0, "fallback not payable");
    }
}
