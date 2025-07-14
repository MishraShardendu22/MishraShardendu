// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract User {
    struct TicketInfo {
        address eventContract;
        uint256 ticketID;
    }

    // Mapping from user address to an array of owned tickets
    mapping(address => TicketInfo[]) public userTickets;

    event TicketPurchased(address indexed user, address indexed eventContract, uint256 ticketID);

    /**
     * @notice Adds a ticket to the user's ownership record
     * @param user The address of the ticket buyer
     * @param eventContract The address of the Event contract
     * @param ticketID The ticket ID
     */
    function addTicket(address user, address eventContract, uint256 ticketID) external {
        userTickets[user].push(TicketInfo(eventContract, ticketID));
        emit TicketPurchased(user, eventContract, ticketID);
    }

    /**
     * @notice Returns all tickets owned by a user
     * @param user The address of the user
     * @return An array of TicketInfo structs
     */
    function getTickets(address user) external view returns (TicketInfo[] memory) {
        return userTickets[user];
    }
}
