import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "../components/Events/EventCard";
import { getAllEvents } from "@/web-3/blockchain";
import { v1 as uuidv1 } from "uuid";
import { useAccount } from "wagmi";
import { useUserStore } from "@/store/store";
import EventDetailsModal from "../../src/components/Events/EventDetailsModal"; // Adjust path if necessary
import { Event } from "@/components/Types/Event.types";

const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State for modal
  const { address } = useAccount();
  const userId = useUserStore((state) => state.user?.id);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (address && !userId) {
      const newId = uuidv1();
      setUser({ id: newId });
    }
  }, [address, userId, setUser]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const blockchainEvents = await getAllEvents();
        const mappedEvents: Event[] = blockchainEvents.map((event) => ({
          id: event.address,
          name: event.name,
          description: "Description not available",
          date: "Date not available",
          location: "Location not available",
          price: event.price,
          ticketsAvailable: event.numTicketsLeft,
          totalTickets: event.numTickets,
          imageUrl: "https://via.placeholder.com/500",
          organizer: event.owner,
          category: "Category not available",
          time: "Time not available",
          callback: () => {},
        }));
        setEvents(mappedEvents);
        const uniqueCategories = [
          "All",
          ...new Set(mappedEvents.map((event) => event.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const displayEvents = events
    .filter(
      (event) =>
        selectedCategory === "All" || event.category === selectedCategory
    )
    .filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
      </div>

      {/* Floating Elements */}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Discover Events
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore and participate in events secured by blockchain technology
          </p>
        </motion.div>

        {/* Search Bar */}
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-sm"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-600 font-medium">Loading events...</p>
          </div>
        ) : displayEvents.length > 0 ? (
          <AnimatePresence>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {displayEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard
                    event={event}
                    onEventSelect={setSelectedEvent} // Pass function to open modal
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="text-center py-16 bg-gray-50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-gray-500 text-lg">No events found.</div>
          </motion.div>
        )}

        {/* Render the modal when an event is selected */}
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
