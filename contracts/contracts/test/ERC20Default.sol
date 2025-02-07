// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20PresetFixedSupply} from "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Default is ERC20PresetFixedSupply, Ownable {
    constructor() ERC20PresetFixedSupply("TEST", "TEST", 100000000000 * 10 ** decimals(), msg.sender) {}

    function mint(address user, uint256 amount) external onlyOwner {
        _mint(user, amount);
    }
}
