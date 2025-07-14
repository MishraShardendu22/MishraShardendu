"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import dayjs from "dayjs";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Copy,
  Trash2,
  MessageSquare,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

const MessageSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex items-center justify-center gap-4 mt-6">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="flex items-center gap-1"
    >
      <ChevronLeft className="w-4 h-4" />
      Previous
    </Button>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Page</span>
      <span className="px-3 py-1 rounded-md bg-secondary text-sm font-medium">
        {currentPage}
      </span>
      <span className="text-sm font-medium">of {totalPages}</span>
    </div>
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="flex items-center gap-1"
    >
      Next
      <ChevronRight className="w-4 h-4" />
    </Button>
  </div>
);

const MessageList = ({
  messages,
  currentPage,
  onPageChange,
  handleDelete,
}: {
  messages: Message[];
  currentPage: number;
  onPageChange: (page: number) => void;
  handleDelete: (messageId: string) => void;
}) => {
  const messagesPerPage = 3;
  const startIndex = (currentPage - 1) * messagesPerPage;
  const paginatedMessages = messages.slice(startIndex, startIndex + messagesPerPage);

  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3,
  };

  return (
    <div>
      {paginatedMessages.length > 0 ? (
        <div className="space-y-4">
          {paginatedMessages.map((message) => (
            <Card 
              key={message._id} 
              className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary"
            >
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                      Message by{" "}
                      <span className="text-primary font-semibold">
                        {uniqueNamesGenerator(customConfig)}
                      </span>
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(message._id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-lg leading-relaxed">{message.content}</p>
                  <time className="text-sm text-muted-foreground block">
                    {dayjs(message?.createdAt).format("MMM D, YYYY h:mm A")}
                  </time>
                </div>
              </CardContent>
            </Card>
          ))}
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(messages.length / messagesPerPage)}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <Alert className="bg-secondary/50">
          <AlertDescription>No messages available.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

const Page = () => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: session } = useSession();
  const username = session?.user?.username || "unknown";

  useEffect(() => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    setProfileUrl(`${baseUrl}/u/${username}`);
  }, [username]);

  useEffect(() => {
    const initialize = async () => {
      await fetchMessages();
      setLoading(false);
    };
    initialize();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/get-message");
      setMessages(res.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages.");
      setMessages([]);
    }
  };

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Profile URL copied to clipboard.");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy to clipboard.");
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      const res = await axios.post("/api/delete-message", {
        id: session?.user?._id,
        messageId: messageId,
      });
      toast.success(res.data.message);
      await fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl space-y-8">
      <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="space-y-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span>Message Dashboard</span>
          </CardTitle>

          <div className="flex items-center gap-3 p-4 bg-background rounded-lg border shadow-sm">
            <LinkIcon className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium truncate flex-1">{profileUrl}</p>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={copyToClipBoard}
              className="gap-2 hover:bg-secondary/80"
            >
              <Copy className="w-4 h-4" />
              Copy URL
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Messages</h2>
        {loading ? (
          <MessageSkeleton />
        ) : messages && messages.length > 0 ? (
          <MessageList
            messages={messages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            handleDelete={handleDelete}
          />
        ) : (
          <Alert className="bg-secondary/50">
            <AlertDescription>No messages available.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Page;
