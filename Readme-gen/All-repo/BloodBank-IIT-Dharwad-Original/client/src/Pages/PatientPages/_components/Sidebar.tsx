/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Droplet, ClipboardList, BotIcon, HelpCircle} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStore } from "@/store/store"
import { useThemeStore } from "@/store/themeStore"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
    setActiveTab: (tab: "availability" | "requests" | "chatbot" | "faq") => void
    activeTab: string
}


    const sidebarItems = [
    { icon: Droplet, label: "Blood Availability", id: "availability" },
    { icon: ClipboardList, label: "Blood Requests", id: "requests" },
    { icon: BotIcon, label: "Chat With AI", id: "chatbot" },
    { icon: HelpCircle, label: "FAQ", id: "faq" },
    ]

    export function Sidebar({ setActiveTab, activeTab }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const user = useUserStore((state: any) => state.user)
    const { theme } = useThemeStore()


    return (
        <motion.div
        animate={{ width: isCollapsed ? 80 : 280 }}
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] ${
            theme === "light" ? "bg-white border-gray-200 shadow-md" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
        } border-r`}
        >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
            {!isCollapsed && (
                <span className={`text-xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                BloodSphere
                </span>
            )}
            <Button
                size="icon"
                variant="default"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`hover:${theme === "light" ? "bg-gray-100" : "bg-primary/10"}`}
            >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            </div>

            <nav className="flex-1 p-4">
            <div className="space-y-2">
                {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                    <TooltipProvider key={item.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                            "w-full justify-start gap-4",
                            isActive &&
                                (theme === "light"
                                ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                : "bg-primary/10 text-primary"),
                            !isActive && theme === "light" && "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                            )}
                            onClick={() => setActiveTab(item.id as "availability" | "requests" | "chatbot" | "faq")}
                        >
                            <Icon className="w-5 h-5" />
                            {!isCollapsed && item.label}
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className={isCollapsed ? "block" : "hidden"}>
                        {item.label}
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                )
                })}
            </div>
            </nav>

            {user && (
            <div className={`p-4 border-t ${theme === "light" ? "border-gray-200 bg-gray-50" : "border-primary/10"}`}>
                <div className="flex items-center gap-4">
                <Avatar className={`${theme == "light" ? "border border-gray-300 bg-white" : "border-white"}`}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                    <div className="flex flex-col">
                    <span className={`font-medium ${theme === "light" ? "text-gray-800" : ""}`}>{user.name}</span>
                    <span className={`text-sm ${theme === "light" ? "text-gray-500" : "text-muted-foreground"}`}>
                        {user.email}
                    </span>
                    </div>
                )}
                </div>
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={isCollapsed ? "block" : "hidden"}>
                    Logout
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </div>
            )}
        </div>
        </motion.div>
    )
    }

export default Sidebar

