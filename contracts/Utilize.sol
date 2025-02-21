// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Utilize {
    struct Listing {
        address payable seller;
        string title; // e.g., "Starlink Subscription"
        string utilityType; // e.g., "Internet"
        uint256 price; // e.g., 0.05 ETH
        bool isFulfilled;
    }

    Listing[] public listings;
    mapping(address => uint256) public reputation;

    event ListingCreated(uint256 id, string title, uint256 price);
    event PaymentCompleted(uint256 id, address buyer);

    // Sellers create utility listings
    function createListing(
        string memory _title,
        string memory _utilityType,
        uint256 _price
    ) external {
        listings.push(Listing({
            seller: payable(msg.sender),
            title: _title,
            utilityType: _utilityType,
            price: _price,
            isFulfilled: false
        }));
        emit ListingCreated(listings.length - 1, _title, _price);
    }

    // Buyers pay sellers directly
    function pay(uint256 _id) external payable {
        Listing storage listing = listings[_id];
        require(msg.value == listing.price, "Incorrect amount");
        require(!listing.isFulfilled, "Listing fulfilled");

        listing.seller.transfer(msg.value);
        listing.isFulfilled = true;
        reputation[listing.seller] += 1;
        emit PaymentCompleted(_id, msg.sender);
    }
}