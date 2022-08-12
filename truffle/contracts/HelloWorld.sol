// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract HelloWorld {

    string private name = "";

    function hello() public view returns (string memory) {
        return string(abi.encodePacked("Hello ", name));
    }

    function whatIsYourName(string memory newName) public returns (string memory) {
        name = newName;
        return "Name changed";
    }
}