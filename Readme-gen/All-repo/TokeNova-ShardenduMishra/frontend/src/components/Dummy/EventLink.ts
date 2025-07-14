import { Event } from "../Types/Event.types"

export const events_array: Event[] = [
    {
        "id": "124",
        "name": "Ethereum Developer Conference",
        "description": "Join us for the biggest Ethereum developer event of the year with keynotes from Vitalik Buterin and other industry leaders. This two-day event will cover the latest developments in Ethereum, Layer 2 solutions, and emerging use cases.",
        "date": "2025-04-15",
        "time": "4pm to 10pm",
        "location": "Virtual",
        "price": "5",
        "ticketsAvailable": 350,
        "totalTickets": 500,
        "imageUrl": "https://via.placeholder.com/800x400",
        "organizer": "0x1234...5678",
        "category": "Tech",
        "callback": "bookTicket(124)"
    },
    {
        "id": "538",
        "name": "Solana Developer Conference",
        "description": "Join us for the biggest Solana developer event of the year with keynotes from industry leaders. This two-day event will cover the latest developments in Solana, Layer 2 solutions, and emerging use cases.",
        "date": "2025-04-20",
        "time": "8pm to 12pm",
        "location": "BITS Hyderabad",
        "price": "10",
        "ticketsAvailable": 100,
        "totalTickets": 400,
        "imageUrl": "https://via.placeholder.com/800x400",
        "organizer": "0x1234...5678",
        "category": "Tech",
        "callback": "bookTicket(538)"
    },
    {
        "id": "312",
        "name": "Polkadot Summit 2025",
        "description": "A premier event for Polkadot developers and enthusiasts. Explore the latest trends in parachains, cross-chain interoperability, and decentralized finance.",
        "date": "2025-05-05",
        "time": "10am to 6pm",
        "location": "San Francisco, CA",
        "price": "20",
        "ticketsAvailable": 200,
        "totalTickets": 500,
        "imageUrl": "https://via.placeholder.com/800x400",
        "organizer": "0x9876...4321",
        "category": "Tech",
        "callback": "bookTicket(312)"
    },
    {
        "id": "415",
        "name": "Cardano Blockchain Expo",
        "description": "An exclusive gathering for Cardano developers, researchers, and investors. Learn about the latest advancements in smart contracts and dApps.",
        "date": "2025-06-10",
        "time": "9am to 5pm",
        "location": "Virtual",
        "price": "0",
        "ticketsAvailable": 500,
        "totalTickets": 500,
        "imageUrl": "https://via.placeholder.com/800x400",
        "organizer": "0xABCD...1234",
        "category": "Tech",
        "callback": "bookTicket(415)"
    },
    {
        "id": "527",
        "name": "NEAR Protocol Hackathon",
        "description": "A weekend-long hackathon focusing on building scalable applications using the NEAR Protocol. Compete for exciting prizes and networking opportunities.",
        "date": "2025-07-01",
        "time": "10am to 10pm",
        "location": "Berlin, Germany",
        "price": "15",
        "ticketsAvailable": 150,
        "totalTickets": 300,
        "imageUrl": "https://via.placeholder.com/800x400",
        "organizer": "0x5678...9101",
        "category": "Hackathon",
        "callback": "bookTicket(527)"
    }
];