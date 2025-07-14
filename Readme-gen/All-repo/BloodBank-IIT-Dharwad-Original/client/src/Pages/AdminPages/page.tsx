"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import axiosInstance from "@/util/axiosInstance"
import Analytics from "./_components/Analytics"
import DonorManagement from "./_components/DonorManagement"
import PatientManagement from "./_components/PatientManagement"
import OrganizationManagement from "./_components/OrganizationManagement"
import DonationLocationManagement from "./_components/DonationLocationManagement"
import BloodRequestManagement from "./_components/BloodRequestManagement"
import { Sidebar } from "./_components/Sidebar"
import { useThemeStore } from "@/store/themeStore"
import { User, Mail, Phone, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"

interface IAdmin {
    _id: string
    name: string
    email: string
    phoneNo: string
    }

    const Admin = () => {
    const [adminInfo, setAdminInfo] = useState<IAdmin | null>(null)
    const [activeTab, setActiveTab] = useState<
        "analytics" | "donors" | "patients" | "organizations" | "locations" | "requests"
    >("analytics")
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchAdminInfo()
    }, [])

    const fetchAdminInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/verifyAdmin")
        setAdminInfo(data.data)
        } catch (error) {
        console.error("Error fetching admin info:", error)
        toast.error("Failed to fetch admin information. Please try again.")
        }
    }

    const renderContent = () => {
        switch (activeTab) {
        case "analytics":
            return <Analytics />
        case "donors":
            return <DonorManagement />
        case "patients":
            return <PatientManagement />
        case "organizations":
            return <OrganizationManagement />
        case "locations":
            return <DonationLocationManagement />
        case "requests":
            return <BloodRequestManagement />
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
                Admin Dashboard
                </h1>
            </motion.div>
            {adminInfo && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                    className={`mb-6 ${
                    theme === "light"
                        ? "bg-white border-gray-200 shadow-sm"
                        : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                    }`}
                >
                    <CardHeader>
                    <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                        <Shield className="w-6 h-6 mr-2 text-blue-500" />
                        Admin Information
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <User className="w-5 h-5 mr-2" />
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{adminInfo.name}</span>
                    </div>
                    <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <Mail className="w-5 h-5 mr-2" />
                        <span className="font-medium">Email:</span>
                        <span className="ml-2">{adminInfo.email}</span>
                    </div>
                    <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <Phone className="w-5 h-5 mr-2" />
                        <span className="font-medium">Phone:</span>
                        <span className="ml-2">{adminInfo.phoneNo}</span>
                    </div>
                    <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <Badge
                        variant="outline"
                        className={`${
                            theme === "light" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-primary/10 text-primary"
                        }`}
                        >
                        Administrator
                        </Badge>
                    </div>
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

export default Admin

