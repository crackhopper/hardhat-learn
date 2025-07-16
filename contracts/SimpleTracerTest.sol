// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleTracerTarget {
    event LogValue(uint256 value);
    function doSomething() public {
        emit LogValue(123);
    }
}

contract SimpleTracerCaller {
    function callTarget(address targetAddress) public {
        SimpleTracerTarget(targetAddress).doSomething();
    }
}