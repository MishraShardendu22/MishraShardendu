import { buyTicket } from "@/web-3/blockchain";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Event } from "../Types/Event.types";
import { useAccount } from "wagmi";
import { Calendar, MapPin, Clock, Ticket, Users, Wallet } from "lucide-react";

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => {
  const { address } = useAccount();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBuyClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmBuy = async () => {
    if (!address) return;

    try {
      const buyData = await buyTicket(address, event.id, event.price);
      console.log(buyData);
      setShowConfirmation(false);
      toast.success("The ticket has been booked.");
    } catch (error) {
      console.error("Error buying ticket:", error);
      toast.error("Failed to book ticket. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelBuy = () => {
    setShowConfirmation(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Main Modal Container */}
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full border border-indigo-100/50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pointer-events-none" />

        {/* Decorative Blob */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

        {/* Image Section */}
        <div className="relative">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-56 object-cover"
          />
          <button
            className="absolute top-4 right-4 bg-white text-indigo-700 rounded-full p-2 shadow-lg hover:bg-indigo-100 hover:scale-110 transition-all duration-300"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Content Section */}
        <div className="relative p-6">
          {/* Event Name with Ticket Icon */}
          <div className="flex items-center gap-3 mb-4">
            <Ticket className="w-6 h-6 text-indigo-600" />
            <h2 className="text-3xl font-bold text-indigo-700">{event.name}</h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-gray-800 font-medium">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800 font-medium">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-gray-800 font-medium">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-semibold text-indigo-600">{event.price} ETH</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Tickets Available</p>
                <p className="text-gray-800 font-medium">
                  {event.ticketsAvailable}/{event.totalTickets}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Organizer</p>
                <p className="text-gray-800 font-medium">{event.organizer}</p>
              </div>
            </div>
          </div>

          {/* Buy Button and Confirmation Dialog */}
          <div className="relative mt-6">
            <Button
              onClick={handleBuyClick}
              className="cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Buy Ticket
            </Button>

            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-40 mt-4 left-0 right-0 bg-white rounded-xl shadow-xl p-4 border border-gray-100 z-10"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Purchase</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to buy this ticket?</p>
                <div className="flex justify-end gap-3">
                  <Button
                    size="sm"
                    onClick={handleCancelBuy}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleConfirmBuy}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg"
                  >
                    Confirm
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventDetailsModal;