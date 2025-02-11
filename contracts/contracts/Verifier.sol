// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Achievement.sol";
import "./Project.sol";

struct Verifier {
    address wallet;
    bool isVerifier;
}