pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract gioMINT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _itemLinks;

    constructor() ERC721("gioMINT", "GMNT") {}

    function mintNFT(address user, string memory itemLink) public returns (uint256) {
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        _mint(user, newId);
        _itemLinks[newId] = itemLink;
        return newId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "No such NFT!");
        return _itemLinks[tokenId];
    }
}