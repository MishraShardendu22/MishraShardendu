import { useAccount } from "wagmi";
import { v1 as uuidv1 } from "uuid";
import EventList from "./EventList";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/store";
import { getAllEvents } from "@/web-3/blockchain";
import { DEFAULT_EVENT, Event } from "./EventData";
import EventDetailsModal from "@/components/Events/EventDetailsModal";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const { address } = useAccount();
  const userId = useUserStore((state) => state.user?.id);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (address && !userId) {
      const newId = uuidv1();
      setUser({ id: newId });
    }
  }, [address, userId, setUser]);

  const getStageText = (stageIndex: number): string => {
    const stageNames = [
      "Upcoming",
      "Active",
      "Check-in Open",
      "Cancelled",
      "Closed",
    ];
    return stageNames[stageIndex] ?? "Unknown Stage";
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const blockchainEvents = await getAllEvents();
        const mappedEvents: Event[] = blockchainEvents.map((event) => ({
          ...DEFAULT_EVENT,
          id: event.address,
          name: event.name,
          price: event.price.toString(),
          ticketsAvailable: event.numTicketsLeft,
          totalTickets: event.numTickets,
          organizer: event.owner,
          location: event.location,
          date: event.date,
          description: getStageText(event.stage),
        }));
        setEvents(mappedEvents);
        setCategories([
          "All",
          ...new Set(mappedEvents.map((event) => event.category)),
        ]);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 py-20">
        {/* Animated background patterns */}
        <div className="absolute top-0 right-0 opacity-20">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <rect width="404" height="404" fill="url(#pattern)" />
          </svg>
        </div>
        <div className="absolute -bottom-10 -left-10 opacity-10">
          <svg
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            className="rotate-45"
          >
            <circle
              cx="202"
              cy="202"
              r="180"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="12 12"
              className="text-indigo-600"
            />
            <circle
              cx="202"
              cy="202"
              r="150"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="text-purple-600"
            />
          </svg>
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center relative z-10"
          >
            <div
              className="inline-block relative"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Discover Events
                </span>
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isHeaderHovered ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p
              className="text-gray-700 max-w-2xl mx-auto text-xl leading-relaxed mt-4 relative"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Explore and participate in events secured by blockchain technology
              <motion.span
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-indigo-300 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mb-12 relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            placeholder="Search events by name or description..."
            className="w-full px-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-md text-gray-700 placeholder-gray-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-indigo-400 hover:shadow-md hover:text-indigo-600"
              }`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center h-64 py-12"
          >
            <div className="relative h-20 w-20">
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <div className="h-full w-full rounded-full border-4 border-indigo-100"></div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <div className="h-full w-full rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  className="h-8 w-8 text-indigo-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-lg mt-4">
              Loading events...
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </motion.div>
        ) : displayEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <EventList
              events={displayEvents}
              onEventSelect={setSelectedEvent}
            />
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-gray-600 text-lg font-medium">
              No events found.
            </div>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or category filters.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 font-medium text-sm"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}

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
