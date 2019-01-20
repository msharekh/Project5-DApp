pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }

//  Add a name and a symbol for your starNotary tokens
    string public name;
    string public symbol;

    function setName(string _name) public{
        name = _name;
    }

    function setSymbol(string _symbol) public{
        symbol = _symbol;
    }
//

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    function createStar(string _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

// Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.
    function lookUptokenIdToStarInfo(uint256 _tokenId) public view returns (string ) {
        Star memory s = tokenIdToStarInfo[_tokenId];
        return s.name;
    }
//

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;
      }

// Add a function called exchangeStars, so 2 users can exchange their star tokens...
//Do not worry about the price, just write code to exchange stars between users.

    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public{

        // 1) User 1 puts his/her star for sale
        
        // putStarUpForSale( _tokenId1,  _price);

        // 2) User 2 puts his/her star for sale
        // putStarUpForSale( _tokenId1,  _price);

        // 3) User 1 calls the function exchangeStars, to get the star 
        address user1 = ownerOf(_tokenId1);
        address user2 = ownerOf(_tokenId2);

        //exchanging ..
        _removeTokenFrom(user1, _tokenId1);
        _addTokenTo( user2, _tokenId1);
        _removeTokenFrom(user2, _tokenId2);
        _addTokenTo( user1, _tokenId2);
    }



/* 
1) User 1 puts his/her star for sale
2) User 2 puts his/her star for sale
3) User 1 calls the function exchangeStars, to get the star 
from User 2 that is on sale, in exchange of his/her star that is on sale
The user 1 provides the following parameters to exchangeStars: 
id token star for sale user 1, id token star for sale user 2

You just exchange 1 star from user1 and 1 star from user2
Just verify that the owner of _tokenId1 is the one executing the function
 *///

// Write a function to Transfer a Star. The function should transfer a star from the address of the caller.
// The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
//
    function transferStar(address _to, uint256 _tokenId) public{
                
        _removeTokenFrom(msg.sender, _tokenId);
        _addTokenTo(_to, _tokenId);

        emit Transfer(msg.sender, _to, _tokenId);
    }
}
