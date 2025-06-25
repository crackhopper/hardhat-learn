// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./BaseContract.sol";

// 创建该合约的时候，存入100ETH
contract TestContract {
    address contract1;
    address contract2;
    address contract3;
    address contract4;
    constructor(address _contract1,address _contract2, address _contract3, address _contract4) {
        contract1 = _contract1;
        contract2 = _contract2;
        contract3 = _contract3;
        contract4 = _contract4;
    }
    event logResult(bool success, string log);

    // 测试call的语法
    function call1WithETH() public {
        (bool success, ) = contract1.call{value: 1 ether}("");
        emit logResult(success, "call1WithETH");
    }

    // 测试send语法
    function send1WithETH() public {
        bool success = payable(contract1).send(1 ether);
        emit logResult(success, "send1WithETH");
    }

    // 测试transfer语法
    function transfer1WithETH() public {
        payable(contract1).transfer(1 ether);
        // 没有返回值，失败则扔出异常
        emit logResult(true, "transfer1WithETH");
    }

    // 调用合约的函数 getBalance() : 从BaseContract继承的
    // 方法1: 用call的方式，calldata来调用。
    function functionCall1_getBalance() public {
        // abi.encodeWithSignature 编码函数签名, 得到bytes4的函数选择器
        bytes memory functionSelector = abi.encodeWithSignature("getBalance()");
        // call的方式，需要用calldata来调用
        (bool success, bytes memory result) = contract1.call(functionSelector);
        if (success){
            // abi.decode 解码
            uint balance = abi.decode(result, (uint256));
            emit logResult(true, string(abi.encodePacked("getBalance() return: ", balance)));
        }else{
            emit logResult(false, "getBalance() failed");
        }
    }
    // 方法2，通过导入的BaseContract，使用合约公开接口直接调用
    function functionCall1_getBalance2() public {
        BaseContract baseContract = BaseContract(contract1);
        uint256 balance = baseContract.getBalance();
        emit logResult(true, string(abi.encodePacked("getBalance() return: ", balance)));
    }


}