/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

import { EventCreatorABI, EventABI, UserABI } from "@/lib/abi";

const EVENT_CREATOR_CONTRACT_ADDRESS = import.meta.env
  .VITE_EVENT_CREATOR_CONTRACT_ADDRESS;
const USER_CONTRACT_ADDRESS = import.meta.env.VITE_USER_CONTRACT_ADDRESS;
const RPC_URL = import.meta.env.VITE_RPC_URL;
if (!EVENT_CREATOR_CONTRACT_ADDRESS || !USER_CONTRACT_ADDRESS || !RPC_URL) {
  throw new Error("Missing required environment variables");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);

const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error("No Web3 provider found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return signer;
};

//EventCreator
export const createEvent = async (
  numTickets: number,
  price: number,
  canBeResold: boolean,
  royaltyPercent: number,
  eventName: string,
  eventSymbol: string,
  eventDate: number, // Unix timestamp
  eventPlace: string
) => {
  try {
    const signer = await getSigner();

    const eventCreatorContract = new ethers.Contract(
      EVENT_CREATOR_CONTRACT_ADDRESS,
      EventCreatorABI,
      signer
    );

    const tx = await eventCreatorContract.createEvent(
      numTickets,
      ethers.parseEther(price.toString()),
      canBeResold,
      royaltyPercent,
      eventName,
      eventSymbol,
      USER_CONTRACT_ADDRESS,
      eventDate,
      eventPlace
    );

    await tx.wait();
    console.log("Event created successfully:", tx.hash);

    return tx.hash;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

let tc = 1;
export const getAllEvents = async () => {
  try {
    const signer = await getSigner();

    // EventCreator contract instance
    const eventCreatorContract = new ethers.Contract(
      EVENT_CREATOR_CONTRACT_ADDRESS,
      EventCreatorABI,
      signer
    );

    const creators = await eventCreatorContract.getAllCreators();

    if (creators.length === 0) {
      return [];
    }

    // Collect all events from all creators
    const allEvents = await Promise.all(
      creators.map(async (creatorAddress: string) => {
        const eventAddresses = await eventCreatorContract.getCreatorEvents(
          creatorAddress
        );

        // Fetch details for each event
        return Promise.all(
          eventAddresses.map(async (eventAddress: string) => {
            return await getEventDetails(eventAddress);
          })
        );
      })
    );

    return allEvents.flat(); // Flatten nested arrays
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events.");
  }
};

export const getCreatorEvents = async (creatorAddress: string) => {
  try {
    const signer = await getSigner();

    const eventCreatorContract = new ethers.Contract(
      EVENT_CREATOR_CONTRACT_ADDRESS,
      EventCreatorABI,
      signer
    );

    // Fetch events created by this creator
    const eventAddresse = await eventCreatorContract.getCreatorEvents(
      creatorAddress
    );

    // Fetch event details
    const events = await Promise.all(
      eventAddresse.map(async (eventAddress: string) => {
        return await getEventDetails(eventAddress);
      })
    );
    return events;
  } catch (error) {
    console.error(
      `Error fetching events for creator ${creatorAddress}:`,
      error
    );
    throw new Error("Failed to fetch creator events.");
  }
};

//Event
export const buyTicket = async (
  userAddress: string,
  eventAddress: string,
  ticketPrice: string
) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  const signer = await getSigner();

  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);
  try {
    const tx = await eventContract.buyTicket({
      value: ethers.parseEther(ticketPrice.toString()),
    });

    await tx.wait();
    await addUserTicket(userAddress, eventAddress, tc++);

    return tx.hash;
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw new Error("Ticket purchase failed");
  }
};

export const buyTicketFromUser = async (
  eventAddress: string,
  ticketID: number,
  resalePrice: number
) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  const signer = await getSigner();

  // Create contract instance
  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);

  try {
    const tx = await eventContract.buyTicketFromUser(ticketID, {
      value: resalePrice.toString(),
    });

    await tx.wait();
    console.log("Resale ticket purchased successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error buying resale ticket:", error);
    throw new Error("Resale ticket purchase failed");
  }
};

export const setTicketToUsed = async (
  eventAddress: string,
  ticketID: number
) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  const signer = await getSigner();

  // Create contract instance
  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);

  try {
    const tx = await eventContract.setTicketToUsed(ticketID);
    await tx.wait();
    console.log("Ticket marked as used successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error marking ticket as used:", error);
    throw new Error("Failed to mark ticket as used");
  }
};

export const setTicketForSale = async (
  eventAddress: string,
  ticketID: number,
  resalePrice: number
): Promise<string> => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  if (resalePrice <= 0) {
    throw new Error("Resale price must be greater than zero");
  }
  const signer = await getSigner();

  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);

  try {
    const tx = await eventContract.setTicketForSale(ticketID, resalePrice);
    await tx.wait();
    console.log("Ticket listed for resale successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error setting ticket for sale:", error);
    throw new Error("Failed to set ticket for sale");
  }
};

export const withdrawFunds = async (eventAddress: string): Promise<string> => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  const signer = await getSigner();

  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);

  try {
    const tx = await eventContract.withdraw();
    await tx.wait();
    console.log("Withdrawal successful:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error during withdrawal:", error);
    throw new Error("Failed to withdraw funds");
  }
};

export const approveBuyer = async (
  eventAddress: string,
  buyer: string,
  ticketID: number
): Promise<string> => {
  if (!eventAddress || !buyer) {
    throw new Error("Event address and buyer address are required");
  }
  const signer = await getSigner();

  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);

  try {
    const tx = await eventContract.approveAsBuyer(buyer, ticketID);
    await tx.wait();
    console.log("Buyer approved successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error approving buyer:", error);
    throw new Error("Failed to approve buyer");
  }
};

export const setEventStage = async (
  eventAddress: string,
  newStage: number
): Promise<string> => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }
  const signer = await getSigner();

  const eventContract = new ethers.Contract(eventAddress, EventABI, signer);

  try {
    const tx = await eventContract.setStage(newStage);
    await tx.wait();
    console.log("Event stage changed successfully:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error changing event stage:", error);
    throw new Error("Failed to change event stage");
  }
};

export const getEventDetails = async (eventAddress: string) => {
  if (!eventAddress) {
    throw new Error("Event address is required");
  }

  const eventContract = new ethers.Contract(eventAddress, EventABI, provider);

  try {
    const details = await eventContract.getEventDetails();
    return {
      address: eventAddress,
      owner: details[0],
      numTickets: Number(details[1]),
      numTicketsLeft: Number(details[2]),
      price: ethers.formatEther(details[3]), // Convert wei to ether
      royaltyPercent: Number(details[4]),
      canBeResold: details[5],
      stage: Number(details[6]),
      name: details[7],
      symbol: details[8],
      date: details[9],
      location: details[10],
    };
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw new Error("Failed to fetch event details");
  }
};

//User
export const addUserTicket = async (
  userAddress: string,
  eventContract: string,
  ticketID: number
) => {
  if (!userAddress || !eventContract || ticketID === undefined) {
    throw new Error("Invalid input parameters");
  }
  const signer = await getSigner();

  const userContract = new ethers.Contract(
    USER_CONTRACT_ADDRESS,
    UserABI,
    signer
  );

  try {
    const tx = await userContract.addTicket(
      userAddress,
      eventContract,
      ticketID
    );
    await tx.wait(); // Wait for transaction confirmation

    console.log(`Ticket added successfully: ${ticketID}`);
    return tx;
  } catch (error) {
    console.error("Error adding ticket:", error);
    throw new Error("Failed to add ticket");
  }
};

export const getUserTickets = async (userAddress: string) => {
  if (!userAddress) {
    throw new Error("User address is required");
  }

  const signer = await getSigner();
  const userContract = new ethers.Contract(
    USER_CONTRACT_ADDRESS,
    UserABI,
    signer
  );

  try {
    const tickets = await userContract.getTickets(userAddress);

    return tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw new Error("Failed to fetch tickets");
  }
};

export const deleteEvent = async (CONTRACT_ADDRESS: string) => {
  const signer = await getSigner();
  const EventContract = new ethers.Contract(CONTRACT_ADDRESS, EventABI, signer);
  try {
    const tx = await EventContract.setStage(3);

    await tx.wait(); // Wait for confirmation
    alert("Event cancelled successfully!");
  } catch (error) {
    console.error("Error cancelling event:", error);
    alert("Failed to cancel the event.");
  }
};
