// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Utilize {
    struct Listing {
        address payable seller;
        string title;
        string utilityType;
        uint256 price;
        bool isFulfilled;
    }

    // Array to store all listings
    Listing[] public listings;

    // Events
    event ListingCreated(uint256 indexed id, address seller, string title, uint256 price);
    event PaymentProcessed(uint256 indexed id, address buyer, address seller, uint256 amount);

    function createListing(string memory _title, string memory _utilityType, uint256 _price) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_utilityType).length > 0, "Utility type cannot be empty");
        require(_price > 0, "Price must be greater than 0");

        listings.push(Listing({
            seller: payable(msg.sender),
            title: _title,
            utilityType: _utilityType,
            price: _price,
            isFulfilled: false
        }));

        emit ListingCreated(listings.length - 1, msg.sender, _title, _price);
    }

    function getListings() public view returns (Listing[] memory) {
        return listings;
    }

    function pay(uint256 _id) public payable {
        require(_id < listings.length, "Invalid listing ID");
        Listing storage listing = listings[_id];
        require(!listing.isFulfilled, "Listing is already fulfilled");
        require(msg.value == listing.price, "Incorrect payment amount");
        require(msg.sender != listing.seller, "Seller cannot buy their own listing");

        listing.isFulfilled = true;
        listing.seller.transfer(msg.value);

        emit PaymentProcessed(_id, msg.sender, listing.seller, msg.value);
    }
}
