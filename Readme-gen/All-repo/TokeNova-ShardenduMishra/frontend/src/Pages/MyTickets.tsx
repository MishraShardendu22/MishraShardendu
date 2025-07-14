import { useState, useEffect } from "react";
import { getUserTickets, getEventDetails } from "@/web-3/blockchain";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Ticket as TicketType } from "@/components/Types/User.types";
import { QRCodeSVG } from "qrcode.react";

const MyTickets = () => {
  const { address } = useAccount();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQRFor, setShowQRFor] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!address) return;

      try {
        setLoading(true);
        const userTickets = await getUserTickets(address);
        const ticketsWithDetails = await Promise.all(
          userTickets.map(async (ticket: TicketType) => {
            const eventDetails = await getEventDetails(ticket.eventContract);
            return {
              id: `${ticket.eventContract}-${ticket.ticketID}`,
              ticketID: ticket.ticketID,
              eventContract: ticket.eventContract,
              eventName: eventDetails.name,
              eventDate: new Date().getTime(),
              eventLocation: eventDetails.location,
              total: eventDetails.price,
              quantity: 1,
            };
          })
        );

        setTickets(ticketsWithDetails);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [address]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-indigo-600 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 w-16 h-16 border-r-4 border-purple-500 rounded-full"
          />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading your tickets...
        </p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
              <Ticket size={48} className="text-indigo-600" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">No Tickets Found</h2>
          <p className="text-gray-600 mt-2 max-w-md">
            You don't have any tickets yet. Browse events and secure your spot!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="relative mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 z-10 relative">
            My Tickets
          </h1>
        </motion.div>
      </div>

      <ul className="space-y-8">
        {tickets.map((ticket, index) => (
          <motion.li
            key={ticket.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-100 rounded-full opacity-50" />
            <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-indigo-100 rounded-full opacity-50" />

            <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between relative">
              <div className="flex-1">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <span className="font-bold text-lg">#{ticket.ticketID}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {ticket.eventName}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-5">
                      <div className="flex items-center text-base text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-base text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        {ticket.eventLocation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex items-center gap-8">
                <div className="text-right">
                  <p className="text-3xl font-bold text-indigo-700">
                    ETH {ticket.total}
                  </p>
                  <p className="text-base text-gray-500 mt-1">
                    {ticket.quantity} Ticket{ticket.quantity > 1 ? "s" : ""}
                  </p>
                </div>

                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="bg-indigo-100 p-4 rounded-full"
                >
                  <Ticket size={24} className="text-indigo-600" />
                </motion.div>

                {/* Generate QR Button with Tooltip */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowQRFor(showQRFor === ticket.id ? null : ticket.id)
                    }
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {showQRFor === ticket.id ? "Hide QR" : "Generate QR"}
                  </button>
                  {showQRFor === ticket.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      <QRCodeSVG
                        value={`${ticket.eventContract}-${ticket.ticketID}-${address}`}
                        size={150}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;