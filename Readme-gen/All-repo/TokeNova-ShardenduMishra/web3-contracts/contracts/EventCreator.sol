// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Event.sol";

contract EventCreator {
    struct Creator {
        address creatorAddress;
        address[] events; // Stores event contract addresses created by the creator
    }

    uint public totalEvents = 0;
    mapping(address => Creator) public creators;
    address[] public creatorList; // Stores all unique creators

    event CreateEvent(address indexed creator, address eventAddress);

    /**
     * @notice Creates an event and deploys an Event contract
     * @param _numTickets Number of tickets
     * @param _price Price per ticket
     * @param _canBeResold Are tickets allowed to be resold
     * @param _royaltyPercent Royalty percentage for resales
     * @param _eventName Name of the event
     * @param _eventSymbol Symbol for the event tickets
     * @param _userContract Address of the User contract
     * @param _eventDate Date of the event (Unix timestamp)
     * @param _eventPlace Place of the event
     * @return newEvent The address of the newly created event contract
     */
    function createEvent(
        uint256 _numTickets,
        uint256 _price,
        bool _canBeResold,
        uint256 _royaltyPercent,
        string memory _eventName,
        string memory _eventSymbol,
        address _userContract,
        uint256 _eventDate,
        string memory _eventPlace
    ) external returns (address newEvent) {
        // Deploy a new Event contract
        Event e = new Event(
            msg.sender,
            _numTickets,
            _price,
            _canBeResold,
            _royaltyPercent,
            _eventName,
            _eventSymbol,
            _userContract,
            _eventDate,
            _eventPlace
        );

        // If it's a new creator, add them to the creator list
        if (creators[msg.sender].creatorAddress == address(0)) {
            creators[msg.sender].creatorAddress = msg.sender;
            creatorList.push(msg.sender);
        }

        // Store the event under the creator's record
        creators[msg.sender].events.push(address(e));
        totalEvents++;

        emit CreateEvent(msg.sender, address(e));

        return address(e);
    }

    /**
     * @notice Retrieves all event contract addresses created by a specific creator
     * @param _creator The creator's address
     * @return eventAddresses Array of event contract addresses
     */
    function getCreatorEvents(address _creator) external view returns (address[] memory) {
        return creators[_creator].events;
    }

    /**
     * @notice Retrieves all registered event creators
     * @return Array of creator addresses
     */
    function getAllCreators() external view returns (address[] memory) {
        return creatorList;
    }
}
