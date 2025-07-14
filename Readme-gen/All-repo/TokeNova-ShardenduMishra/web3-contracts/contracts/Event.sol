// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./User.sol";

/// @title Contract to mint tickets of an event
contract Event is ERC721, ReentrancyGuard {
    /// Control Event Status at a granular level
    enum Stages {
        Prep,
        Active,
        CheckinOpen,
        Cancelled,
        Closed
    }
    // Stages public stage = Stages.Prep;
    Stages public stage;
    /// Control Ticket Status at a granular level
    /// Valid - Ticket is Valid
    /// Used - Ticket is used
    /// AvailableForSale - Ticket is allowed to be sold to someone
    enum TicketStatus {
        Valid,
        Used,
        AvailableForSale
    }

    // Ticket struct
    struct Ticket {
        uint256 resalePrice;
        TicketStatus status;
    }

    // array to store tickets, index will be ticketID
    Ticket[] public tickets;

    // ticket original price
    uint256 public price;

    uint256 public numTicketsLeft;
    uint256 public numTickets;
    uint256 public royaltyPercent;

    bool public canBeResold;
    bool public isCancelled;

    // organizer of event
    address payable public owner;

    address public userContract;

    uint256 public eventDate;
    string public eventPlace;

    // to store the balances for buyers and organizers
    mapping(address => uint256) public balances;
    mapping(address => bool) public isUserRefund;

    // EVENTS
    event CreateTicket(
        address contractAddress,
        string eventName,
        address buyer,
        uint256 ticketID
    );
    event WithdrawMoney(address receiver, uint256 money);
    event OwnerWithdrawMoney(address owner, uint256 money);
    event TicketForSale(address seller, uint256 ticketID);
    event TicketSold(
        address contractAddress,
        string eventName,
        address buyer,
        uint256 ticketID
    );
    event TicketUsed(
        address contractAddress,
        uint256 ticketID,
        string eventName
    );
    event StageChanged(Stages newStage);

    // Creates a new Event Contract
    constructor(
        address _owner,
        uint256 _numTickets,
        uint256 _price,
        bool _canBeResold,
        uint256 _royaltyPercent,
        string memory _eventName,
        string memory _eventSymbol,
        address _userContract,
        uint256 _eventDate,
        string memory _eventPlace
    ) ERC721(_eventName, _eventSymbol) {
        require(
            _royaltyPercent >= 0 && _royaltyPercent <= 100,
            "Royalty must be between 0 and 100"
        );
        require(_numTickets > 0, "Number of tickets must be greater than zero");

        owner = payable(_owner);
        numTicketsLeft = _numTickets;
        numTickets = _numTickets;
        price = _price;
        canBeResold = _canBeResold;
        royaltyPercent = _royaltyPercent;
        stage = Stages.Prep;
        userContract = _userContract;
        eventDate = _eventDate;
        eventPlace = _eventPlace;
    }

    /**
     * @notice Buy tickets
     * @dev Checks: State is Active, has enough money
     */
    function buyTicket() public payable requiredStage(Stages.Active) {
        require(numTicketsLeft > 0, "No tickets left");
        require(msg.value >= price, "Insufficient amount paid");

        // Create Ticket t, Store t in tickets array
        tickets.push(Ticket(price, TicketStatus.Valid));
        uint256 ticketID = tickets.length - 1;
        numTicketsLeft--;

        // store overpaid in balances
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        balances[owner] += price;

        // Mint NFT
        _safeMint(msg.sender, ticketID);

        // User(userContract).addTicket(msg.sender, address(this), ticketID);

        emit CreateTicket(address(this), name(), msg.sender, ticketID);
    }

    /**
     * @notice Mark ticket as used
     * @dev Only a valid buyer can mark ticket as used
     * @param ticketID ticket ID of ticket
     */
    function buyTicketFromUser(uint256 ticketID)
        public
        payable
        requiredStage(Stages.Active)
    {
        // Check if ticket is available for sale
        require(tickets[ticketID].status == TicketStatus.AvailableForSale, "Ticket is not available for sale");

        // calc amount to pay after royalty
        uint256 ticketPrice = tickets[ticketID].resalePrice;
        
        // refund overpaid payment
        if (msg.value > ticketPrice) {
            payable(msg.sender).transfer(msg.value - price);
        }
        uint256 royalty = (royaltyPercent * ticketPrice) / 100;
        uint256 priceToPay = ticketPrice - royalty;

        address payable seller = payable(ownerOf(ticketID));
        // store balances for seller and owner to withdraw later
        balances[seller] += priceToPay;
        balances[owner] += royalty;

        emit TicketSold(address(this), name(), msg.sender, ticketID);
        safeTransferFrom(seller, msg.sender, ticketID);

        tickets[ticketID].status = TicketStatus.Valid;
    }

    /**
     * @notice Mark ticket as used
     * @dev Only a valid buyer can mark ticket as used
     * @param ticketID ticket ID of ticket
     */
    function setTicketToUsed(uint256 ticketID)
        public
        requiredStage(Stages.CheckinOpen)
        ownsTicket(ticketID)
    {
        // Validate that user has a ticket they own and it is valid
        require(tickets[ticketID].status == TicketStatus.Valid, "Ticket is invalid");

        // Ticket is valid so mark it as used
        tickets[ticketID].status = TicketStatus.Used;

        // Burn the Token
        _burn(ticketID);

        // Raise event which Gate Management system can consume then
        emit TicketUsed(address(this), ticketID, name());
    }

    /**
     * @notice Mark ticket as used
     * @dev Only a valid buyer can mark ticket as used
     * @param ticketID ticket ID of ticket
     * @param resalePrice resale price for ticket
     */
    function setTicketForSale(uint256 ticketID, uint256 resalePrice)
        public
        requiredStage(Stages.Active)
        ownsTicket(ticketID)
    {
        // Validate that user has a ticket they own and it is valid
        require(tickets[ticketID].status != TicketStatus.Used, "Ticket is used");
        require(canBeResold == true, "Ticket can't be resold");

        // Ticket is valid so mark it for sale
        tickets[ticketID].status = TicketStatus.AvailableForSale;
        tickets[ticketID].resalePrice = resalePrice;

        // Raise event which Gate Management system can consume then
        emit TicketForSale(msg.sender, ticketID);
    }

    /**
     * @notice User to withdraw money
     * @dev User can withdraw money if event cancelled or overpaid for ticket
     */
    function withdraw() public nonReentrant {
        if (msg.sender != owner) {
            // Amount to send to user
            uint256 sendToUser = balances[msg.sender];

            // If event cancelled, send user the amount they overpaid for ticket + ticket price refund
            if (
                stage == Stages.Cancelled && isUserRefund[msg.sender] == false
            ) {
                sendToUser += balanceOf(msg.sender) * price;
            }

            // Cannot withdraw if no money to withdraw
            require(sendToUser > 0, "No money to withdraw");

            // Update balance before transfering money
            balances[msg.sender] = 0;
            isUserRefund[msg.sender] = true;

            address payable receiver = payable(msg.sender);
            receiver.transfer(sendToUser);
            emit WithdrawMoney(msg.sender, sendToUser);
        } else {
            // Owner
            require(stage == Stages.Closed, "Event is not closed");
            uint256 ownerBalance = balances[owner];
            require(ownerBalance > 0, "Owner balance is 0");

            // Update balance before transfering money
            balances[owner] = 0;

            address payable receiver = payable(msg.sender);
            receiver.transfer(ownerBalance);
            emit OwnerWithdrawMoney(msg.sender, ownerBalance);
        }
    }

    /**
     * @dev approve a buyer to buy ticket of another user
     */
    function approveAsBuyer(address buyer, uint256 ticketID)
        public
        requiredStage(Stages.Active)
    {
        require(ownerOf(ticketID) == msg.sender, "Not the ticket owner");
        setApprovalForAll(buyer, true);
        approve(buyer, ticketID);
    }

    /**
     * @notice Change Status
     * @dev Only owner can change state
     * @param _stage Stages as set in enum Stages
     */
    function setStage(Stages _stage) public onlyOwner returns (Stages) {
        require(_stage > stage, "Cannot revert to a previous stage");
    
        if (_stage == Stages.Cancelled) {
            isCancelled = true;
            uint refundAmount = price * tickets.length;
            require(balances[owner] >= refundAmount, "Insufficient balance for refunds");
            balances[owner] -= refundAmount;
        }

        stage = _stage;
        emit StageChanged(_stage);
        return stage;
    }

    /**
     * @notice Returns event details
     */
    function getEventDetails()
        external
        view
        returns (
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            Stages,
            string memory,
            string memory,
            uint256,
            string memory
        )
    {
        return (
            owner,
            numTickets,
            numTicketsLeft,
            price,
            royaltyPercent,
            canBeResold,
            stage,
            name(),
            symbol(),
            eventDate,
            eventPlace
        );
    }

    // MODIFIERS
    // Only owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed");
        _;
    }

    // Requires stage to be _stage
    modifier requiredStage(Stages _stage) {
        require(stage == _stage, "Not the required stage");
        _;
    }

    // Check if user is ticket owner
    modifier ownsTicket(uint256 ticketID) {
        require(ownerOf(ticketID) == msg.sender, "Not the owner of ticket");
        _;
    }
}
