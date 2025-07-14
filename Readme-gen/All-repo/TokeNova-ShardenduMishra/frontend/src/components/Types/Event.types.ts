/* eslint-disable @typescript-eslint/no-explicit-any */

interface Event {
    code?: any;
    ticketsRemaining?: any;
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    time:string
    price: any;
    ticketsAvailable: number;
    totalTickets: number;
    imageUrl: string;
    organizer: string;
    category: string;
    callback: any;
}

export type {
    Event
}