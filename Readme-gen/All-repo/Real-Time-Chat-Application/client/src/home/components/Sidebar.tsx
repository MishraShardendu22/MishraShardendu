import { useState, useEffect } from "react";
import { MessageSquare, Loader2, AlertCircle, Search } from "lucide-react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import userConversation from "@/zustand/useConversation";
import axios from "axios";

const SideBar = () => {
  interface User {
    _id: string;
    fullname: string;
    username: string;
    profilePic: string;
    gender: string;
    profilepic: string;
  }
  
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedConversation, selectedConversation } = userConversation();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/user/currentChats");
      console.log(selectedConversation)
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch chats.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = data.filter(user => 
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <Card className="h-screen border-r rounded-none flex flex-col">
      <div className="p-4 border-b space-y-4 flex-shrink-0">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Conversations
        </h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-2">
          {error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : filteredData.length > 0 ? (
            filteredData.map((user) => (
              <Card
                key={user._id}
                className={`transition-all duration-200 cursor-pointer hover:bg-accent/50 hover:scale-[1.02] ${
                  selectedConversation?._id === user._id
                    ? "bg-accent shadow-md"
                    : "bg-card"
                }`}
                onClick={() => setSelectedConversation(user)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {user.fullname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span 
                      className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full bg-green-500"
                      title="Online"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.fullname}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      @{user.username}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              {searchTerm ? (
                <>
                  <h3 className="font-medium text-lg">No matches found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-medium text-lg">No conversations yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Start a new chat to begin messaging
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SideBar;