import axios from "axios";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import { Event } from "../Types/Event.types";
import { useUserStore } from "@/store/store";
import { useBalance, useAccount } from "wagmi";
import { buyTicket, getAllEvents, getEventDetails } from "@/web-3/blockchain";
import { useState, useEffect, useRef } from "react";
import { MessageCircleCodeIcon, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const VITE_CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL;

const ChatWithAI = () => {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: string; timestamp: string }[]
  >([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [eventId, setEventId] = useState<string | null>(null);
  const userAddress = useAccount().address;

  useEffect(() => {
    async function getData() {
      const events = (await getAllEvents())?.map(event => ({
        ...event,
        id: event.address
      }));
      if (Array.isArray(events)) setAllEvents(events);
    }
    getData();
  }, []);

  const account = useAccount();
  const balance = useBalance({ address: account.address });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleSidebar = () => setOpen(!open);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim()) {
      const userMessage = {
        text: inputValue,
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      let formattedBalance = 0;
      if (balance.data?.formatted) {
        try {
          formattedBalance = Number(balance.data.formatted.replace(/,/g, ""));
          if (isNaN(formattedBalance)) throw new Error("Invalid number format");
        } catch (err) {
          console.error("Error parsing balance:", err);
          formattedBalance = 0;
        }
      }

      const payload = {
        userId: user?.id || "unknown",
        balance: formattedBalance,
        events: allEvents,
        message: inputValue,
      };
      console.log(payload)

      const safePayload = JSON.parse(
        JSON.stringify(payload, (_, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

      try {
        const res = await axios.post(VITE_CHATBOT_URL, safePayload);

        if (res.data.response.action === "confirm_booking") {
          toast.success("Booking confirmed for the event");
          setEventId(res.data.response.event_id);
          const ans = await getEventDetails(res.data.response.event_id);
          buyTicket(userAddress!, eventId!, ans.price);
        }
        const botMessage = {
          text: DOMPurify.sanitize(res.data.response.message),
          sender: "bot",
          timestamp: new Date().toISOString(),
        };


        setMessages((prev) => [...prev, botMessage]);
        toast.success("Message sent to AI");
      } catch (error) {
        console.error("Error sending message to AI:", error);
        toast.error("Failed to get response from AI");
      }

      setInputValue("");
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
        onClick={toggleSidebar}
      >
        <MessageCircleCodeIcon size={18} />
        <span>Ask AI</span>
      </div>
      {open && (
        <div className="fixed inset-0 z-50" onClick={toggleSidebar}>
          <div
            className="fixed top-0 right-0 h-full w-96 md:w-1/3 lg:w-2/5 bg-white shadow-lg z-50 transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium text-xl">AI Assistant</h3>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Start a conversation with the AI assistant
                  </p>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-3/4 p-3 rounded-lg ${message.sender === "user"
                            ? "bg-purple-100 text-purple-900"
                            : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWithAI;