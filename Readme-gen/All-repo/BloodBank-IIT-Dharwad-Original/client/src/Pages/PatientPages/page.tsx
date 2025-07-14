"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BloodAvailability from "./_components/BloodAvailability"
import PatientBloodRequests from "./_components/BloodRequests"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Sidebar } from "./_components/Sidebar"
import { useThemeStore } from "@/store/themeStore"
import { User, Mail, Phone, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ChatBot from "../_AI-Integration/ChatBot"
import FAQ from "./_components/FAQ"

interface IPatient {
    _id: Types.ObjectId
    name: string
    email: string
    phoneNo?: string
    bloodType?: string
    }

    const Patient = () => {
    const [patientInfo, setPatientInfo] = useState<IPatient | null>(null)
    const [activeTab, setActiveTab] = useState<"availability" | "requests" | "chatbot" | "faq">("availability")
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchPatientInfo()
    }, [])

    const fetchPatientInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/patient/verifyPatient")
        setPatientInfo(data.data)
        } catch (error) {
        console.error("Error fetching patient info:", error)
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
                Patient Dashboard
                </h1>
            </motion.div>
            {patientInfo && (
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
                        <User className="w-6 h-6 mr-2" />
                        Patient Information
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <User className="w-5 h-5 mr-2" />
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{patientInfo.name}</span>
                    </div>
                    <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <Mail className="w-5 h-5 mr-2" />
                        <span className="font-medium">Email:</span>
                        <span className="ml-2">{patientInfo.email}</span>
                    </div>
                    {patientInfo.phoneNo && (
                        <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <Phone className="w-5 h-5 mr-2" />
                        <span className="font-medium">Phone:</span>
                        <span className="ml-2">{patientInfo.phoneNo}</span>
                        </div>
                    )}
                    {patientInfo.bloodType && (
                        <div className={`flex items-center ${theme === "light" ? "text-gray-600" : ""}`}>
                        <Badge
                            variant="outline"
                            className={`${
                            theme === "light" ? "bg-red-50 text-red-600 border-red-200" : "bg-primary/10 text-primary"
                            }`}
                        >
                            Blood Type: {patientInfo.bloodType}
                        </Badge>
                        </div>
                    )}
                    </CardContent>
                </Card>
                {!patientInfo.bloodType && (
                    <Alert variant="default" className="mb-6">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <AlertTitle className="text-red-500">Blood Type Not Set</AlertTitle>
                    <AlertDescription className="text-red-500">
                        Please update your profile to include your blood type. This information is crucial for accurate
                        blood requests and potential emergencies.
                    </AlertDescription>
                    </Alert>
                )}
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

export default Patient

