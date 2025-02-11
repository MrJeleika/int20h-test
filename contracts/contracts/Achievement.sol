// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

struct Achievement {
    uint achievementId;
    string description;
    bool isAchievement;
    address studentWallet;
    uint projectId;
    uint verifiedCount;
    bool isVerified;
    uint256 nftTokenId;
}