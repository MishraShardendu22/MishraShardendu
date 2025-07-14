"use client"
import { useState, useEffect } from "react"
import BloodAvailability from "./_components/BloodAvailability"
import PatientBloodRequests from "./_components/BloodRequests"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Sidebar } from "./_components/Sidebar"
import { useThemeStore } from "@/store/themeStore"
import ChatBot from "../AI-Integration/ChatBot"
import FAQ from "./_components/FAQ"
import Profile from "./_components/Profile"
import MyReports from "./_components/MyReports"
import DiseaseChecker from "./_components/DiseaseComponent/DiseaseChecker"
import NeabyHospital from "./_components/NeabyHospital"
import TBDetection from "./_components/TBDetection"
import Nutrition from "./_components/Nutrition"
import {Chatbot} from "@mishrashardendu22/chatbot-widget";


const UserPage = () => {
    const [activeTab, setActiveTab] = useState<"availability" | "requests" | "find-hospital"| "chatbot" | "faq" | "profile" | "my-reports" | "disease-checker" | "tb-detection" | "diet-planner">("disease-checker")
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { theme } = useThemeStore()

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsCollapsed(true)
        }
    }


    const renderContent = () => {
        switch (activeTab) {
            case "availability":
                return <BloodAvailability />
            case "requests":
                return <PatientBloodRequests />
            case "chatbot":
                return <ChatBot />
            case "faq":
                return <FAQ />
            case "profile":
                return <Profile />
            case "my-reports":
                return <MyReports />
            case "disease-checker":
                return <DiseaseChecker />
            case  "tb-detection": 
                return <TBDetection />
            case "find-hospital":
                return <NeabyHospital />
            case "diet-planner": 
                return <Nutrition />
            default:
                return null
        }
    }

    return (
        <div
            className={`flex h-screen ${
                theme === "light" 
                    ? "bg-gradient-to-b from-gray-50 to-gray-100" 
                    : "bg-gradient-to-b from-base-100 to-primary/20"
            }`}
            data-theme={theme === "dark" ? "bloodsphere-dark" : "bloodsphere-light"}
        >
            <Navbar />
            <Sidebar 
                setActiveTab={setActiveTab} 
                activeTab={activeTab} 
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <Chatbot />
            <main className={`flex-1 pt-16 m-8 overflow-auto transition-all duration-200 ease-in-out
                ${isCollapsed ? 'pl-20 lg:pl-[80px]' : 'pl-20 lg:pl-[280px]'}`}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 }}
                    className="w-full"
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    )
}

export default UserPage