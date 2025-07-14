import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Send, Bot, User, Loader2, MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {Chatbot} from "@mishrashardendu22/chatbot-widget";


import axios from "axios"

const GO_BACK = import.meta.env.VITE_GO_BACK as string

const ChatBot = () => {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const { theme } = useThemeStore()

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await axios.post(GO_BACK + "/chat", { query: input })
      console.log(GO_BACK + "/chat")
      console.log(response)
      const parsedResponse = JSON.parse(response.data.response)
      const aiMessage = { role: "ai" as const, content: parsedResponse.answer }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container p-4 mx-auto md:p-6">
      <Chatbot />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-6 md:mb-8"
      >
        <h1 className={`text-2xl md:text-4xl font-bold ${
          theme === "light" ? "text-gray-800" : "text-primary"
        }`}>
          Healthcare Assistant
        </h1>
        <p className={`mt-2 text-sm md:text-base ${
          theme === "light" ? "text-gray-600" : "text-base-content/70"
        }`}>
          Ask me anything about healthcare, symptoms, medications, or general health advice
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
      >
        <Card className={`${
          theme === "light"
            ? "bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            : "bg-base-200/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-200"
        } overflow-hidden`}>
          <CardHeader className={`${
            theme === "light" 
              ? "bg-gray-50 border-b border-gray-200" 
              : "bg-base-300/30 border-b border-primary/10"
          }`}>
            <CardTitle className={`flex items-center text-lg font-semibold ${
              theme === "light" ? "text-gray-800" : "text-primary"
            }`}>
              <div className={`p-2 rounded-lg mr-3 ${
                theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
              }`}>
                <MessageCircle className={`w-5 h-5 ${
                  theme === "light" ? "text-red-600" : "text-primary"
                }`} />
              </div>
              MediCare AI Assistant
              <Badge variant="secondary" className="ml-auto">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center py-12 ${
                      theme === "light" ? "text-gray-500" : "text-base-content/70"
                    }`}
                  >
                    <Bot className={`w-12 h-12 mx-auto mb-4 ${
                      theme === "light" ? "text-gray-300" : "text-base-content/30"
                    }`} />
                    <p className="mb-2 text-lg font-medium">Welcome to MediCare AI</p>
                    <p className="text-sm">Start a conversation by asking about health, symptoms, or medical advice</p>
                  </motion.div>
                )}
                
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "ai" && (
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === "light" ? "bg-red-50 border border-red-200" : "bg-primary/10 border border-primary/30"
                        }`}>
                          <Bot className={`w-4 h-4 ${
                            theme === "light" ? "text-red-600" : "text-primary"
                          }`} />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] md:max-w-[70%] ${
                        msg.role === "user" ? "order-1" : "order-2"
                      }`}>
                        <div className={`p-3 rounded-lg ${
                          msg.role === "user"
                            ? theme === "light"
                              ? "bg-red-600 text-white"
                              : "bg-primary text-primary-content"
                            : theme === "light"
                            ? "bg-gray-100 text-gray-800 border border-gray-200"
                            : "bg-base-100 text-base-content border border-base-300"
                        } ${
                          msg.role === "user" 
                            ? "rounded-br-sm" 
                            : "rounded-bl-sm"
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                      
                      {msg.role === "user" && (
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center order-2 ${
                          theme === "light" ? "bg-red-600" : "bg-primary"
                        }`}>
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex justify-start gap-3"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      theme === "light" ? "bg-red-50 border border-red-200" : "bg-primary/10 border border-primary/30"
                    }`}>
                      <Bot className={`w-4 h-4 ${
                        theme === "light" ? "text-red-600" : "text-primary"
                      }`} />
                    </div>
                    <div className={`p-3 rounded-lg rounded-bl-sm ${
                      theme === "light" ? "bg-gray-100 border border-gray-200" : "bg-base-100 border border-base-300"
                    }`}>
                      <div className="flex items-center gap-2">
                        <Loader2 className={`w-4 h-4 animate-spin ${
                          theme === "light" ? "text-red-600" : "text-primary"
                        }`} />
                        <span className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-base-content/70"
                        }`}>
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className={`p-4 border-t ${
              theme === "light" ? "bg-gray-50 border-gray-200" : "bg-base-300/30 border-primary/10"
            }`}>
              <form onSubmit={sendMessage} className="flex gap-3">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your health question here..."
                  className={`flex-1 ${
                    theme === "light" 
                      ? "bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-400" 
                      : "bg-base-100 border-base-300 focus:border-primary focus:ring-primary placeholder-base-content/50"
                  } transition-colors duration-200`}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`px-6 ${
                    theme === "light" 
                      ? "bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300" 
                      : "bg-primary hover:bg-primary/90 text-primary-content disabled:bg-base-300"
                  } transition-colors duration-200`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </>
                  )}
                </Button>
              </form>
              
              <p className={`text-xs mt-2 ${
                theme === "light" ? "text-gray-500" : "text-base-content/60"
              }`}>
                This AI provides general health information and should not replace professional medical advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ChatBot