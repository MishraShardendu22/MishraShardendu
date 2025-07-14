import { motion } from "framer-motion";
import { Event } from "../Types/Event.types";
import { deleteEvent, setEventStage } from "@/web-3/blockchain";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

interface EventCardProps {
  event: Event;
  onEventSelect: (event: Event) => void;
  onCancelEvent?: (event: Event) => void;
}

const EventCard = ({ event, onEventSelect, onCancelEvent }: EventCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const soldPercentage = ((event.totalTickets - event.ticketsAvailable) / event.totalTickets) * 100;
  
  // Format price with only 2 decimal places if needed
  const formattedPrice = Number(event.price).toFixed(Number(event.price) % 1 === 0 ? 0 : 2);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleCancelClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to cancel this event?")) {
      await deleteEvent(event.id);
      if (onCancelEvent) {
        onCancelEvent(event);
      }
    }
    setMenuOpen(false);
  };

  // Determine status color based on percentage sold
  const getStatusColor = () => {
    if (soldPercentage >= 80) return "bg-red-500";
    if (soldPercentage >= 50) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const activateEvent = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await setEventStage(event.id, 1);
    toast.success('Event activated successfully');
  }

  return (
    <motion.div
      onClick={() => onEventSelect(event)}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 relative flex flex-col h-full"
    >
      {/* Image container with gradient overlay */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        
        {/* Category badge - repositioned */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-sm border border-indigo-100">
            {event.category}
          </span>
        </div>
        
        {/* Date badge - new */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-sm flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(Number(event.date)).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Menu button */}
      <div className="absolute top-4 right-4 z-30" ref={menuRef}>
        <button
          onClick={handleMenuClick}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-gray-100 transition shadow-sm border border-gray-200"
          aria-label="Menu"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {/* Dropdown menu - improved */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200">
            <button
              onClick={handleCancelClick}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 transition-colors flex items-center"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              Cancel Event
            </button>
            <button
              onClick={activateEvent}
              className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-gray-50 transition-colors flex items-center"
            >
              Activate Event
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {event.name}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <svg
            className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
          {event.description}
        </p>

        <div className="pt-4 border-t border-gray-100 mt-auto">
          {/* Price and availability section */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="text-lg font-bold text-indigo-700 mr-1">{formattedPrice}</div>
              <div className="text-xs text-gray-500 font-medium">ETH</div>
            </div>
            <div className="text-xs font-medium flex items-center">
              <span className={`inline-block w-2 h-2 ${getStatusColor()} rounded-full mr-1.5`}></span>
              <span className={soldPercentage >= 80 ? "text-red-600" : "text-gray-600"}>
                {event.ticketsAvailable} left
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full"
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1.5">
            <span>Sold: {Math.round(soldPercentage)}%</span>
            <span>Total: {event.totalTickets}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;