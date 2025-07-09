// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Exp1 {
    uint256 public constant TEN_FINNEY = 10_000_000_000_000_000;
    address payable public eth_fallback_receiver;
    // 创建该合约的时候，存入1ETH = 1000 finney
    constructor(address payable eth_fallback_receiver_) payable {
        require(msg.value == 1 ether, "ETH must be sent during deployment.");
        eth_fallback_receiver = eth_fallback_receiver_;
    }
    // 需要用户主动调用来析构
    function destroy() public {
        // 用self destruct
        selfdestruct(eth_fallback_receiver);
    }
    event logResult(bool success, string log);

    // 测试call的语法
    function payFinneyWithCall(address payable addr) public {
        (bool success, ) = addr.call{value: TEN_FINNEY}("");
        emit logResult(success, "payFinneyWithCall");
    }

    // 测试transfer的语法
    function payFinneyWithTransfer(address payable addr) public {
        addr.transfer(TEN_FINNEY);
        emit logResult(true, "payFinneyWithTransfer");
    }

    // 测试send的语法
    function payFinneyWithSend(address payable addr) public {
        bool success = addr.send(TEN_FINNEY);
        emit logResult(success, "payFinneyWithSend");
    }

}