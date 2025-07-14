import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { getCreatorEvents } from "@/web-3/blockchain";
import EventDetailsModal from "../../src/components/Events/EventDetailsModal";
import { Event } from "@/components/Types/Event.types";

const MyEvents = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // New state for modal

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {

        const blockchainEvents = await getCreatorEvents(address);
        const adaptedEvents: Event[] = blockchainEvents.map((event) => ({
          id: event.address,
          name: event.name,
          description: event.symbol,
          date: "TBD",
          location: "TBD",
          time: "TBD",
          price: event.price,
          ticketsAvailable: event.numTicketsLeft,
          totalTickets: event.numTickets,
          imageUrl: "https://via.placeholder.com/500",
          organizer: event.owner,
          category: "Uncategorized",
          callback: () => {},
        }));
        setEvents(adaptedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchMyEvents();
    }, 0);
  }, [address]);

  const displayEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!address) {
    return (
      <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
        <div className="fixed inset-0 -z-10 opacity-5">
          <div
            className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill="none" stroke="%23D1D5DB" stroke-width="1"%3E%3Cpath d="M0 0h40v40H0z"/%3E%3Cpath d="M0 0h40M0 40h40M0 0v40M40 0v40"/%3E%3C/g%3E%3C/svg%3E')]`}
          />
        </div>
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
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-gray-500 mb-6 text-lg">
            Please connect your wallet to view your events
          </p>
          <button
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
      <div className="fixed inset-0 -z-10 opacity-5">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill="none" stroke="%23D1D5DB" stroke-width="1"%3E%3Cpath d="M0 0h40v40H0z"/%3E%3Cpath d="M0 0h40M0 40h40M0 0v40M40 0v40"/%3E%3C/g%3E%3C/svg%3E')]`}
        />
      </div>
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
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            My Events
          </h1>
          <button
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-800 hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/create-event")}
          >
            + Create New Event
          </button>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              placeholder="Search events..."
              className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm pl-10 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="ml-4 text-gray-600 font-medium">
              Loading your events...
            </p>
          </div>
        ) : displayEvents.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {displayEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    • {event.location}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {event.ticketsAvailable}/{event.totalTickets} tickets
                    available
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors duration-300"
                      onClick={() => setSelectedEvent(event)} // Open modal instead of navigating
                    >
                      View Details
                    </button>
                    <button
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => navigate(`/edit-event/${event.id}`)}
                    >
                      Edit Event
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-600 mb-6 text-lg">
              You haven't created any events yet
            </p>
            <button
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/create-event")}
            >
              Create Your First Event
            </button>
          </motion.div>
        )}
      </div>
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default MyEvents;
