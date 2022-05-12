// SPDX-License-Identifier: MIT

// 프라그마 버전
pragma solidity ^0.8.0; 

// NFT Interface ERC721
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


// contract
contract MintSlimeToken is ERC721Enumerable {
    // ERC721(name, symbol)
    constructor() ERC721("Slime", "SLM") {}

    // 앞의 uint256은 slimeTokenId, 뒤에 slimeTokenId는 slimeType 맵핑
    mapping(uint256 => uint256) public silmeTypes;

    function mintSlimeToken() public {
        // totalSupply()는 지금까지 발행한 NFT의 양을 나타냄
        uint256 slimeTokenId = totalSupply() + 1;

        // keccak256 알고리즘 사용 (블럭 생성시간, sender, tokenId) 로 랜덤 추출 (1 ~ 5)
        uint256 slimeType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, slimeTokenId))) % 5 + 1;


        silmeTypes[slimeTokenId] = slimeType;

        // _mint(주최자, NFT TOKEN ID), msg.sender면 이 NFT를 minting한 주최자라는 뜻
        _mint(msg.sender, slimeTokenId);
    }

}