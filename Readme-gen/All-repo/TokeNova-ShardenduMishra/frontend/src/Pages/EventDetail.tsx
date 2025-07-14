/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Event } from "@/components/Types/Event.types";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { address } = useAccount();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const mockEvent: Event = {
          id: id || "1",
          name: "Ethereum Developer Conference",
          description:
            "Join us for the biggest Ethereum developer event of the year with keynotes from Vitalik Buterin and other industry leaders. This two-day event will cover the latest developments in Ethereum, Layer 2 solutions, and emerging use cases.",
          date: "2025-04-15",
          location: "Virtual",
          price: 0.1,
          ticketsAvailable: 350,
          totalTickets: 500,
          imageUrl: "https://via.placeholder.com/800x400",
          organizer: "0x1234...5678",
          category: "Tech",
          callback: () => {},
          time: "10:00 AM",
        };
        setEvent(mockEvent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handlePurchase = async () => {
    console.log(`Purchasing ${quantity} tickets for event ${id}`);
    alert(`Would mint ${quantity} NFT tickets for ${event?.name}`);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
        <div className="container mx-auto px-6 py-24 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="ml-4 text-gray-600 font-medium">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-gray-500 text-lg">Event not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23D1D5DB' stroke-width='1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M0 0h40M0 40h40M0 0v40M40 0v40'/%3E%3C/g%3E%3C/svg%3E')]`}
        />
      </div>
      {/* Floating Blobs */}
      <div className="fixed inset-0 -z-5 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-purple-300 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "5%", opacity: 0.2 }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-indigo-400 blur-3xl"
          animate={{ x: [0, -70, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "40%", right: "10%", opacity: 0.15 }}
        />
      </div>

      <div className="container mx-auto px-6 py-24">
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-t-2xl overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <motion.h1
              className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {event.name}
            </motion.h1>
          </div>
          <div className="p-8 bg-white rounded-b-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <svg
                  className="w-6 h-6 mr-3 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <svg
                  className="w-6 h-6 mr-3 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{event.location}</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg
                  className="w-6 h-6 mr-3 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span className="text-gray-700">{event.category}</span>
              </motion.div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-indigo-600">
                    {event.price} ETH per ticket
                  </h3>
                  <p className="text-gray-600">
                    {event.ticketsAvailable}/{event.totalTickets} tickets
                    available
                  </p>
                  <p className="text-gray-700 mt-2">
                    Total:{" "}
                    {(parseInt(event.price.toString()) * quantity).toFixed(2)}{" "}
                    ETH
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center bg-white rounded-lg border border-gray-200">
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-l-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-gray-800 font-medium">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-r-lg"
                    onClick={() =>
                      setQuantity(
                        Math.min(event.ticketsAvailable, quantity + 1)
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-bold hover:bg-indigo-800 hover:shadow-xl transition-all duration-300"
                onClick={handlePurchase}
                disabled={!address || event.ticketsAvailable < quantity}
              >
                {address
                  ? `Purchase ${quantity} Ticket${quantity > 1 ? "s" : ""}`
                  : "Connect Wallet to Purchase"}
              </button>
              {!address && (
                <p className="text-center text-gray-500 mt-3 text-sm">
                  You need to connect your wallet first
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
