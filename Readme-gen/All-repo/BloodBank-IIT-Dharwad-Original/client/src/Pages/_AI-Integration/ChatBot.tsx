import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
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
    <div className="container max-w-4xl p-4 mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className={`shadow-lg ${theme === "light" ? "bg-white" : "bg-base-200/50 backdrop-blur-sm"}`}>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Bot className={`w-6 h-6 ${theme === "light" ? "text-red-600" : "text-primary"}`} />
              <div>
                <Badge variant="secondary" className="mb-2">
                  MediCare
                </Badge>
                <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                  Your Own Healthcare Assistant
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea
              className={`h-[500px] pr-4 mb-4 rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-base-300/30"}`}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 mb-4 p-4 rounded-lg ${
                      msg.role === "user" ? "ml-auto max-w-[80%]" : "mr-auto max-w-[80%]"
                    }`}
                  >
                    <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.role === "user"
                            ? theme === "light"
                              ? "bg-red-600"
                              : "bg-primary"
                            : theme === "light"
                            ? "bg-gray-200"
                            : "bg-gray-700"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className={`w-5 h-5 ${theme === "light" ? "text-red-600" : "text-primary"}`} />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.role === "user"
                            ? theme === "light"
                              ? "bg-red-600 text-white"
                              : "bg-primary text-white"
                            : theme === "light"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-gray-700 text-gray-100"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-4">
                  <Loader2 className={`w-4 h-4 animate-spin ${theme === "light" ? "text-red-600" : "text-primary"}`} />
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </motion.div>
              )}
            </ScrollArea>
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about healthcare..."
                className={`flex-1 ${
                  theme === "light" ? "bg-gray-50 focus:bg-white" : "bg-gray-700 focus:bg-gray-600"
                }`}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className={`px-4 ${
                  theme === "light" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-primary hover:bg-primary/90"
                }`}
                disabled={isLoading || !input.trim()}
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ChatBot
