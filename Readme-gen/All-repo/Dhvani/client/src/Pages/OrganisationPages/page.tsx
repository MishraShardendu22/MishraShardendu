import { useState} from "react"

import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Sidebar } from "./_components/Sidebar"
import { useThemeStore } from "@/store/themeStore"
import InventoryManager from "./_components/InventoryManager"
import DonationLocations from "./_components/DonationLocations"
import OrganizationBloodRequests from "./_components/BloodRequests"
import BloodDonation from "./_components/BloodDonation"
import OrganisationAnalytics from "./_components/OrganisationAnalytics"
import Profile from "./_components/Profile"
import StrokeAssessment from "./_components/StrokeAssessment/main"


const Organisation = () => {
    const [activeTab, setActiveTab] = useState<"analytics" | "inventory" | "stroke-detection" | "locations" | "requests" | "donation" | "profile">(
        "analytics",
    )
    const { theme } = useThemeStore()

    const renderContent = () => {
        switch (activeTab) {
        case "stroke-detection": 
                return <StrokeAssessment />
        case "analytics":
            return <OrganisationAnalytics />
        case "inventory":
            return <InventoryManager />
        case "locations":
            return <DonationLocations />
        case "requests":
            return <OrganizationBloodRequests />
        case "donation":
            return <BloodDonation />
        case "profile":
            return <Profile />
        default:
            return null
        }
    }

    
    return (
        <div
        className={`flex h-screen ${
            theme === "light" ? "bg-gradient-to-b from-gray-50 to-gray-100" : "bg-gradient-to-b from-base-100 to-primary/20"
        }`}
        data-theme={theme === "dark" ? "bloodsphere-dark" : "bloodsphere-light"}
        >
        <Navbar />
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <main className="flex-1 pt-16 pl-[280px] overflow-auto">
            <div className="container p-6 mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className={`text-4xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                Organisation Dashboard
                </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {renderContent()}
            </motion.div>
            </div>
        </main>
        </div>
    )
}

export default Organisation

