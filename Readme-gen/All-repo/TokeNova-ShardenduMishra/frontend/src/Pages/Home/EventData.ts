import { Event } from "@/components/Types/Event.types";

export const DEFAULT_EVENT: Event = {
  id: "",
  name: "Event Name",
  description: "Description not available",
  date: "Date not available",
  location: "Location not available",
  price: 0,
  ticketsAvailable: 0,
  totalTickets: 0,
  imageUrl: "https://via.placeholder.com/500",
  organizer: "Unknown",
  category: "Category not available",
  time: "Time not available",
  callback: () => {},
};

export type {
    Event,
}