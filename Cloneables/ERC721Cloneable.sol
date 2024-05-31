// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "contracts/Cloneables/ERC721Initializable.sol";

contract ERC721Cloneable is ERC721Initializable {
    uint256 private _nextTokenId;

    constructor() ERC721Initializable("", "") {}

    function initializeStateVariables(
        string memory name_,
        string memory symbol_
    ) public initializer {
        ERC721Initializable.initialize(name_, symbol_);
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Initializable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Initializable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
