// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {
    address public owner;

    constructor() ERC20("MyERC20Token", "METK") {
        _mint(msg.sender, 1000 * 10 ** decimals());
        owner = payable(msg.sender);
    }

    function mint(address sender, uint tokens) public {
        require(sender == owner, "You aren't an owner");
        _mint(sender, tokens);
    }

    function mytransfer(address receiver, uint256 amount) public {
        _transfer(msg.sender, receiver, amount);
    }
}
