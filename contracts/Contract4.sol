// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";
// 记录转账人和转账金额
contract Contract4 is BaseContract {
    mapping(address => uint) public transferAmount;
    constructor() payable BaseContract(){
        
    }    
    receive() external payable{
        // 记录转账金额
        transferAmount[msg.sender] += msg.value;
        emit ReceivedETH(msg.sender, msg.value, "receive");
    }
    fallback() external {
        emit ReceivedETH(msg.sender, 0, "fallback not payable");
    }
    // 获取转账金额
    function getUserAmount(address user) public view returns(uint) {
        return transferAmount[user];
    }
}