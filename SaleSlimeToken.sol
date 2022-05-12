// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintSlimeToken.sol";

contract SaleSlimeToken {
    // MintSlimeToken을 deploy하였을 때 나오는 주소를 저장할 변수
    MintSlimeToken public mintSlimeTokenAddress;

    // constructor를 이용해 set
    constructor (address _mintSlimeTokenAddress) {
        mintSlimeTokenAddress = MintSlimeToken(_mintSlimeTokenAddress);
    }

    // 가격을 관리하는 매핑(SlimetokenId => price) 
    mapping(uint256 => uint256) public slimeTokenPrices;

    // 프론트앤드에서 어떤 토큰이 판매중인지 확인하기 위한 배열
    uint256[] public onSaleSlimeTokenArray;


    // 판매 메소드 (판매할 슬라임과 가격)
    function setForSaleSlimeToken(uint256 _slimeTokenId, uint256 _price) public {
        // ownerOf를 사용해 slimeToken의 소유자 address를 받아옴
        address slimeTokenOwner = mintSlimeTokenAddress.ownerOf(_slimeTokenId);

        // 소유자가 맞는지 확인
        require(slimeTokenOwner == msg.sender, "Caller is not slime token owner.");
        // price가 0보다 큰지 확인
        require(_price > 0, "Price is zero or lower.");
        // 판매등록이 되있는지 확인
        require(slimeTokenPrices[_slimeTokenId] == 0, "This slime token is already on sale.");
        //  isApprovedForAll => address(this)는 SaleSimeToken.sol의 스마트 컨트랙트를 입력함 즉, slimeTokenOwner(소유자)가 SaleSimeToken.sol 스마트 컨트랙트(계약서)에 판매권한을 넘겼는지 확인하는 함수
        require(mintSlimeTokenAddress.isApprovedForAll(slimeTokenOwner, address(this)), "Slime token owner did not approve token.");


        // 토큰 가격 입력
        slimeTokenPrices[_slimeTokenId] = _price;

        // 프론트앤드 판매확인을 위해 push
        onSaleSlimeTokenArray.push(_slimeTokenId);
    }

    // 구매 메소드
    function purchaseSlimeToken(uint256 _slimeTokenId) public payable {
        // 매핑에 담겨있는 가격 꺼내오기
        uint256 price = slimeTokenPrices[_slimeTokenId];
        //ownerOf를 사용해 slimeToken의 소유자 address를 받아옴
        address slimeTokenOwner = mintSlimeTokenAddress.ownerOf(_slimeTokenId);

        // price가 0보다 큰지 확인 (0 보다 작으면 판매등록이 되어있지 않는 토큰이므로)
        require(price > 0, "Slime token not sale." );
        // msg.value(sender가 보내는 MATIC 양)이 price 보다 큰지 확인
        require(price <= msg.value, "Caller sent lower than price.");
        // 토큰은 소유자가 아닌 사람만 구매할 수 있음
        require(slimeTokenOwner != msg.sender, "Caller is slime token owner."); 


        // 슬라임 토큰의 가격 만큼 MATIC을 토큰 소유자에게 전송함
        payable(slimeTokenOwner).transfer(msg.value);
        // 구매자에게 토큰 전송 safeTransferFrom(보내는사람, 받는사람, 보내는물건)
        mintSlimeTokenAddress.safeTransferFrom(slimeTokenOwner, msg.sender, _slimeTokenId);
        
        // 가격 매핑에서 판매된 토큰의 가격을 0원으로 초기화
        slimeTokenPrices[_slimeTokenId] = 0;
        // 판매 목록 array에서 판매된 토큰 제거
        for(uint256 i = 0; i < onSaleSlimeTokenArray.length; i++) {
            // 가격 매핑이 0원이 토큰(판매된 토큰)을 array의 마지막 index로 옮기고 pop을 하여 제거하는 로직
            if(slimeTokenPrices[onSaleSlimeTokenArray[i]] == 0) {
                onSaleSlimeTokenArray[i] = onSaleSlimeTokenArray[onSaleSlimeTokenArray.length - 1];
                onSaleSlimeTokenArray.pop();
            }
        }    
    }

    // 판매중인 토큰 배열의 길이 출력하는 메소드
    function getOnSaleSlimeTokenArrayLength() view public returns (uint256) {
        return onSaleSlimeTokenArray.length;
    }


}