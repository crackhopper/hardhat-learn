// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BaseContract {
    constructor() {
    }
    // 查看合约余额
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    event ReceivedETH(address indexed from, uint amount, string method);


    function test() public pure returns (string memory) {
        return "hello world";
    }
}
