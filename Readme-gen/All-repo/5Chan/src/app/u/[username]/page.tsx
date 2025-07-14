"use client";
import axios from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { MessageCircle, Send, RefreshCcw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-4 bg-muted/50 rounded-lg">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80%] rounded" />
          <Skeleton className="h-4 w-[60%] rounded" />
        </div>
      </Card>
    ))}
  </div>
);

const MessagingPage = () => {
  const specialChar = "||";
  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split(specialChar);
  };

  const params = useParams<{ username: string }>();
  const username = params.username;

  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState<string[]>([
    "Do you think you are smart?",
    "Is Vegeta really better than Goku??",
    "Can you tell me who's your Crush?",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    setMessages([]);
    try {
      const response = await axios.post(`/api/suggest-message`);
      setMessages(parseStringMessages(response.data.data));
      toast.success("Messages fetched successfully!");
    } catch (err) {
      setError("Error fetching messages");
      console.error("Error fetching messages:", err);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    try {
      await axios.post("/api/send-message", {
        username,
        content: messageSent,
      });
      setMessageSent("");
      toast.success("Message sent successfully!");
    } catch (err) {
      setError("Error sending message");
      console.error("Error sending message:", err);
      toast.error("Failed to send the message");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (message: string) => {
    setMessageSent(message);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="bg-card shadow-lg rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <MessageCircle className="w-6 h-6" />
            5Chan Random User
          </CardTitle>
          <CardDescription className="text-base">
            Leave a message for{" "}
            <span className="font-semibold text-primary">{username}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Refresh Button */}
          <Button
            onClick={fetchMessages}
            disabled={loading}
            variant="outline"
            className="w-full h-12"
          >
            <RefreshCcw
              className={`w-5 h-5 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Get Message Suggestions
          </Button>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="rounded-lg">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Message List with Skeleton Loading */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Suggested Messages:</h2>
            {loading ? (
              <MessageSkeleton />
            ) : (
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted"
                    onClick={() => handleSuggestionClick(msg)}
                  >
                    <p className="text-sm">{msg}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="space-y-4">
            {loading ? (
              <Skeleton className="w-full h-[120px] rounded-md" />
            ) : (
              <Textarea
                placeholder="Type your message here..."
                value={messageSent}
                onChange={(e) => setMessageSent(e.target.value)}
                className="min-h-[120px] rounded-lg text-sm p-3"
              />
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            onClick={sendMessage}
            disabled={loading || !messageSent.trim()}
            className="w-full h-12"
          >
            {loading ? (
              <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MessagingPage;