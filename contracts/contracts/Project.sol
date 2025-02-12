// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Student.sol";
import "./Achievement.sol";
import "./Verifier.sol";

struct Project {
    uint projectId;
    string title;
    string description;
    uint256 deadlineTimestamp;
    address owner;
    bool isPublic;
    uint requiredVerificationsCount;
    uint256 rewardAmount;
}