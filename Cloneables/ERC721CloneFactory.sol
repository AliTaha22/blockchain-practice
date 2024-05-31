// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "contracts/Cloneables/ERC721Cloneable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract ERC721CloneFactory {
    address public implementation;
    address public clone;

    event CloneCreated(address indexed cloneAddress);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    function createClone(string memory _name, string memory _symbol)
        external
        returns (address)
    {
        clone = Clones.clone(implementation);
        ERC721Cloneable(clone).initialize(_name, _symbol);
        emit CloneCreated(clone);

        return clone;
    }

    function mint_Token(string memory uri) public {
        ERC721Cloneable(clone).safeMint(msg.sender, uri);
    }

    function getName(address cloneAddress)
        external
        view
        returns (string memory)
    {
        return ERC721Cloneable(cloneAddress).name();
    }

    function getSymbol(address cloneAddress)
        external
        view
        returns (string memory)
    {
        return ERC721Cloneable(cloneAddress).symbol();
    }
}
