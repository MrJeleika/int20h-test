// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Student.sol";

struct Project {
    string title;
    string description;
    uint256 deadlineTimestamp;
    address owner;
    bool isPublic;
}