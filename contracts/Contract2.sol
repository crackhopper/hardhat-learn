// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

contract Contract2 is BaseContract {
    constructor() payable BaseContract(){
        
    }    
    function depositETH() public payable {
        emit ReceivedETH(msg.sender, msg.value, "depositETH");
    }

    function withdrawETH() public {
        require(msg.sender == owner, "only owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {
        emit ReceivedETH(msg.sender, msg.value, "receive");
    }

    fallback() external payable {
        emit ReceivedETH(msg.sender, msg.value, "fallback");
    }
}