import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Sidebar } from "./_components/Sidebar"
import { useThemeStore } from "@/store/themeStore"
import InventoryManager from "./_components/InventoryManager"
import DonationLocations from "./_components/DonationLocations"
import OrganizationBloodRequests from "./_components/BloodRequests"
import BloodDonation from "./_components/BloodDonation"
import OrganisationAnalytics from "./_components/OrganisationAnalytics"

interface IOrganisation {
    _id: Types.ObjectId
    name: string
    email: string
    phoneNo: string
    }

    const Organisation = () => {
    const [orgData, setOrgData] = useState<IOrganisation | null>(null)
    const [activeTab, setActiveTab] = useState<"analytics" | "inventory" | "locations" | "requests" | "donation">(
        "analytics",
    )
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchOrgData()
    }, [])

    const fetchOrgData = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/verifyOrganisation")
        setOrgData(data.data)
        } catch (error) {
        console.error("Error fetching organisation data:", error)
        }
    }

    const renderContent = () => {
        switch (activeTab) {
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
            {orgData && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                    className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                    <CardHeader>
                    <CardTitle className={theme === "light" ? "text-gray-800" : ""}>{orgData.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className={theme === "light" ? "text-gray-600" : ""}>
                        <strong>Email:</strong> {orgData.email}
                    </p>
                    <p className={theme === "light" ? "text-gray-600" : ""}>
                        <strong>Phone:</strong> {orgData.phoneNo}
                    </p>
                    </CardContent>
                </Card>
                </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {renderContent()}
            </motion.div>
            </div>
        </main>
        </div>
    )
}

export default Organisation

