/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { Sidebar } from "./_components/Sidebar"
import { useUserStore } from "@/store/store"
import { useThemeStore } from "@/store/themeStore"
import Navbar from "@/components/Navbar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Phone, Clock, Award, Download, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Survey from "./_components/DonorSurvey"
import ChatBot from "../_AI-Integration/ChatBot"
import FAQ from "./_components/FAQ"

export interface IDonation {
    _id: string
    donorId: Types.ObjectId
    quantity: string
    organisationId: {
        _id: Types.ObjectId
        name: string
    }
    createdAt: string
    }

    export interface IDonationLocation {
    _id: string
    organisationId: Types.ObjectId
    name: string
    contactDetails: string
    location: string
    timings: string
    otherDetails?: string
    }

    const Donor = () => {
    const [activeTab, setActiveTab] = useState<"info" | "history" | "locations" | "certificate" | "survey" | "chatbot" | "faq">("info")
    const [donorInfo, setDonorInfo] = useState<{ name: string; email: string } | null>(null)
    const [donationHistory, setDonationHistory] = useState<IDonation[]>([])
    const [donationLocations, setDonationLocations] = useState<IDonationLocation[]>([])
    const [totalDonations, setTotalDonations] = useState(0)
    const setUser = useUserStore((state: any) => state.setUser)
    const { theme } = useThemeStore()

    const [donationImpactFacts, setDonationImpactFacts] = useState([
        {
            title: "Cancer Support",
            fact: "Many cancer patients need daily blood transfusions during chemotherapy",
            },
            {
            title: "Surgical Need",
            fact: "One liver transplant can require up to 100 units of blood",
            },
            {
            title: "Emergency Reserve",
            fact: "Only 7% of people have O-negative blood, yet it's used in 50% of emergency transfusions",
            },
            {
            title: "Time Sensitivity",
            fact: "Someone needs blood every two seconds in India",
            },
        ])
        
        const [motivationalFacts, setMotivationalFacts] = useState([
            {
            title: "Life Multiplier",
            fact: "If you donate blood 4 times a year for 50 years, you could help save up to 600 lives",
            },
            {
            title: "Quick Recovery",
            fact: "Your body replaces the donated plasma within 24 hours",
            },
            {
            title: "Health Check Bonus",
            fact: "Regular blood donors have an 88% lower risk of heart attacks",
            },
            {
            title: "Calorie Burn",
            fact: "You burn approximately 650 calories by donating one unit of blood",
            },
        ])

    useEffect(() => {
        fetchDonorInfo()
        fetchDonationHistory()
        fetchDonationLocations()
    }, [])

    const fetchDonorInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/verifyDonor")
        setDonorInfo(data.data)
        setUser(data.data)
        } catch (error) {
        console.error("Error fetching donor info:", error)
        }
    }

    const fetchDonationHistory = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/donation-history")
        console.log("Fetched donations:", data.data)
        setDonationHistory(data.data)
        setTotalDonations(data.data.length)
        console.log("Total donations set:", data.data.length)
        } catch (error) {
        console.error("Error fetching donation history:", error)
        }
    }

    const getDonationTier = (donationCount: number) => {
        console.log("Calculating tier for donation count:", donationCount)
        if (donationCount >= 50) return { tier: "Platinum", color: "bg-gradient-to-r from-purple-400 to-purple-600" }
        if (donationCount >= 20) return { tier: "Gold", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" }
        if (donationCount >= 10) return { tier: "Silver", color: "bg-gradient-to-r from-gray-400 to-gray-600" }
        if (donationCount >= 5) return { tier: "Bronze", color: "bg-gradient-to-r from-orange-400 to-orange-600" }
        return { tier: "Not Eligible", color: "bg-gray-400" }
    }

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/donation-location")
        setDonationLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        }
    }

    const downloadCertificate = () => {
        const { tier } = getDonationTier(totalDonations)
        const certificateFile = `${tier.toLowerCase()}.pdf`
        const link = document.createElement("a")
        link.href = `/${certificateFile}`
        link.download = `${tier}_Donor_Certificate.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const renderContent = () => {

        switch (activeTab) {
        case "info":
            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donor Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    {donorInfo && (
                    <>
                        <div className="space-y-4">
                        <div
                            className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-base-300/30"}`}
                        >
                            <h3 className={`mb-2 text-lg font-semibold ${theme === "light" ? "text-gray-800" : ""}`}>
                            Personal Details
                            </h3>
                            <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Name:</span>
                                <span className={theme === "light" ? "text-gray-700" : "text-primary"}>
                                {donorInfo.name}
                                </span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Email:</span>
                                <span className={theme === "light" ? "text-gray-700" : "text-primary"}>
                                {donorInfo.email}
                                </span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Role:</span>
                                <Badge variant={theme === "light" ? "default" : "secondary"}>Donor</Badge>
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="space-y-4">
                        <div
                            className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-base-300/30"}`}
                        >
                            <h3 className={`mb-2 text-lg font-semibold ${theme === "light" ? "text-gray-800" : ""}`}>
                            Donation Statistics
                            </h3>
                            <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Total Donations:</span>
                                <Badge variant={theme === "light" ? "default" : "secondary"}>{totalDonations}</Badge>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Last Donation:</span>
                                <span className={theme === "light" ? "text-gray-700" : "text-primary"}>
                                {donationHistory[0]?.createdAt
                                    ? new Date(donationHistory[0].createdAt).toLocaleDateString()
                                    : "Your generosity is still waiting to make its grand debut! 🎭"}
                                </span>
                            </p>
                            </div>
                        </div>
                        </div>
                    </>
                    )}
                </CardContent>
                <CardContent className="mt-6">
                    <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Why Your Donations Matter ? 
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                    <div
                        className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border text-gray-600 border-gray-200" : "bg-base-300/30"}`}
                    >
                        <h4 className={`mb-2 font-semibold  ${theme == 'light' ? 'text-gray-600': 'text-red-600'}`}>Blood Type Compatibility</h4>
                        <p className="text-sm">
                        Understanding blood type compatibility is crucial for effective donations. Your blood type
                        determines who can receive your blood, potentially saving lives in critical situations.
                        </p>
                    </div>
                    <div
                        className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border text-gray-600 border-gray-200" : "bg-base-300/30"}`}
                    >
                        <h4 className={`mb-2 font-semibold ${theme == 'light' ? 'text-gray-600': 'text-red-600'}`}>Donation Frequency</h4>
                        <p className="text-sm">
                        Whole blood donations can be made every 56 days. Platelets can be donated more frequently, up to
                        24 times a year. Regular donations help maintain a stable blood supply for patients in need.
                        </p>
                    </div>
                    </div>
                </CardContent>

                <CardContent className="mt-6">
                <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donation Impact Facts
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {donationImpactFacts.map((fact, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border text-gray-600 border-gray-200" : "bg-base-300/30"}`}
                    >
                        <h4 className={`mb-2 font-semibold ${theme === "light" ? "text-gray-600" : "text-red-600"}`}>
                        {fact.title}
                        </h4>
                        <p className="text-sm">{fact.fact}</p>
                    </div>
                    ))}
                </div>
                </CardContent>

                <CardContent className="mt-6">
                <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Motivational Facts
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {motivationalFacts.map((fact, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border text-gray-600 border-gray-200" : "bg-base-300/30"}`}
                    >
                        <h4 className={`mb-2 font-semibold ${theme === "light" ? "text-gray-600" : "text-red-600"}`}>
                        {fact.title}
                        </h4>
                        <p className="text-sm">{fact.fact}</p>
                    </div>
                    ))}
                </div>
                </CardContent>
                </Card>
            </motion.div>
            )
        case "history":
            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card
                className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donation History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {donationHistory.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        You haven't made any donations yet. Start your journey of giving today!
                        </p>
                    </div>
                    ) : (
                    <div
                        className={`overflow-hidden border rounded-lg ${theme === "light" ? "border-gray-200" : "border-base-300"}`}
                    >
                        <Table>
                        <TableHeader>
                            <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : "bg-base-300/30"}>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="font-semibold">Organisation</TableHead>
                            <TableHead className="font-semibold">Quantity</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {donationHistory.map((donation, index) => (
                            <TableRow
                                key={index}
                                className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                            >
                                <TableCell>
                                <div className="flex items-center gap-2">
                                    <Calendar
                                    className={`w-4 h-4 ${theme === "light" ? "text-gray-700" : "text-primary"}`}
                                    />
                                    {new Date(donation.createdAt).toLocaleDateString()}
                                </div>
                                </TableCell>
                                <TableCell>{donation.organisationId.name}</TableCell>
                                <TableCell>{donation.quantity}</TableCell>
                                <TableCell>
                                <Badge variant={"default"} className="text-gray-300">
                                    Completed
                                </Badge>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                    )}
                </CardContent>
                </Card>
            </motion.div>
            )
        case "locations":
            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card
                className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donation Locations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                    className={`overflow-hidden border rounded-lg ${theme === "light" ? "border-gray-200" : "border-base-300"}`}
                    >
                    <Table>
                        <TableHeader>
                        <TableRow className={theme === "light" ? "bg-gray-50 text-gray-400" : "bg-base-300/30"}>
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Location</TableHead>
                            <TableHead className="font-semibold">Timings</TableHead>
                            <TableHead className="font-semibold">Contact</TableHead>
                            <TableHead className="font-semibold">Action</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {donationLocations.map((location, index) => (
                            <TableRow
                            key={index}
                            className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                            >
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <MapPin className={`w-4 h-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`} />
                                {location.location}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Clock className={`w-4 h-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`} />
                                {location.timings}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Phone className={`w-4 h-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`} />
                                {location.contactDetails}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button
                                variant="outline"
                                className={`transition-colors ${
                                    theme === "light"
                                    ? "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                    : "bg-primary/10 text-primary hover:bg-primary/20"
                                }`}
                                >
                                Book Appointment
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            )

        case "survey":
            return (
                <Survey />
            )

        case "chatbot":
            return (
                <ChatBot />
            )

        case "certificate":
            const { tier, color } = getDonationTier(totalDonations)
            const nextTier = getNextTier(totalDonations)
            const progress = getProgressToNextTier(totalDonations)

            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donation Achievements
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-8">
                    {totalDonations === 0 ? (
                    <div className="space-y-4 text-center">
                        <div className={`p-6 rounded-full ${theme === "light" ? "bg-gray-100" : "bg-base-300"}`}>
                        <Award className={`w-20 h-20 ${theme === "light" ? "text-gray-400" : "text-primary"}`} />
                        </div>
                        <h3 className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                        Start Your Donation Journey
                        </h3>
                        <p className={`mt-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        Make your first donation to begin earning certificates and rewards!
                        </p>
                        <Button className="mt-4" onClick={() => setActiveTab("locations")}>
                        Find Donation Locations <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                    ) : (
                    <>
                        <div className={`p-6 rounded-full ${color}`}>
                        <Award className="w-24 h-24 text-white" />
                        </div>
                        <div className="text-center">
                        <h3 className={`text-3xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                            {tier} Donor
                        </h3>
                        <p className={`mt-2 text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                            Total Donations: {totalDonations}
                        </p>
                        </div>
                        <div
                        className={`w-full max-w-md p-6 mb-8 rounded-lg ${theme === "light" ? "bg-white border border-gray-200" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                        >
                        <h4
                            className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`}
                        >
                            Your Impact
                        </h4>
                        <p className="mb-4 text-sm text-gray-500">Your donations have made a significant difference:</p>
                        <ul className={`space-y-2 text-sm list-disc list-inside ${theme == 'light' ? 'text-gray-600': ''}`}>
                            <li>Potentially saved up to {totalDonations * 3} lives</li>
                            <li>Contributed to emergency supplies for local hospitals</li>
                            <li>Supported patients with chronic illnesses</li>
                            <li>Aided in critical surgeries and medical procedures</li>
                        </ul>
                        </div>
                        {tier !== "Platinum" && (
                        <div className="w-full max-w-md">
                            <div className="flex justify-between mb-2">
                            <span>{tier}</span>
                            <span>{nextTier}</span>
                            </div>
                            <Progress value={progress} className="w-full" />
                            <p className="mt-2 text-sm text-center text-gray-500">
                            {getProgressMessage(totalDonations, nextTier)}
                            </p>
                        </div>
                        )}
                        <Button className={`mt-6 ${color} text-white hover:opacity-90`} onClick={downloadCertificate}>
                        <Download className="w-4 h-4 mr-2" /> Download Certificate
                        </Button>
                        <div
                        className={`w-full max-w-md p-6 mt-8 rounded-lg ${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300"} bg-opacity-50`}
                        >
                        <h4 className="mb-4 text-lg font-semibold">Achievement Tiers & Benefits</h4>
                        <div className="space-y-4">
                            <div>
                            <div className="flex items-center mb-2">
                                <Badge variant="secondary" className="mr-2">
                                🥉
                                </Badge>
                                <span className="font-semibold">Bronze: 5+ donations</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Recognition on our donor wall and a personalized thank you card.
                            </p>
                            </div>
                            <div>
                            <div className="flex items-center mb-2">
                                <Badge variant="secondary" className="mr-2">
                                🥈
                                </Badge>
                                <span className="font-semibold">Silver: 10+ donations</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Exclusive silver donor pin and priority scheduling for donations.
                            </p>
                            </div>
                            <div>
                            <div className="flex items-center mb-2">
                                <Badge variant="secondary" className="mr-2">
                                🥇
                                </Badge>
                                <span className="font-semibold">Gold: 20+ donations</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                VIP status with personalized health check-ups and gold donor certificate.
                            </p>
                            </div>
                            <div>
                            <div className="flex items-center mb-2">
                                <Badge variant="secondary" className="mr-2">
                                💎
                                </Badge>
                                <span className="font-semibold">Platinum: 50+ donations</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Lifetime achievement award, invitation to annual donor gala, and named scholarship
                                contribution.
                            </p>
                            </div>
                        </div>
                        </div>
                    </>
                    )}
                </CardContent>
                </Card>
            </motion.div>
            )

        case "faq":
                return <FAQ />

        }
    }

    const getNextTier = (donationCount: number) => {
        if (donationCount < 5) return "Bronze"
        if (donationCount < 10) return "Silver"
        if (donationCount < 20) return "Gold"
        if (donationCount < 50) return "Platinum"
        return "Platinum"
    }

    const getProgressToNextTier = (donationCount: number) => {
        if (donationCount < 5) return (donationCount / 5) * 100
        if (donationCount < 10) return ((donationCount - 5) / 5) * 100
        if (donationCount < 20) return ((donationCount - 10) / 10) * 100
        if (donationCount < 50) return ((donationCount - 20) / 30) * 100
        return 100
    }

    const getProgressMessage = (donationCount: number, nextTier: string) => {
        const remaining = {
        Bronze: 5 - donationCount,
        Silver: 10 - donationCount,
        Gold: 20 - donationCount,
        Platinum: 50 - donationCount,
        }[nextTier] ?? 0

        if (remaining <= 0) return `You've reached the ${nextTier} tier!`
        return `${remaining} more donation${remaining > 1 ? "s" : ""} to reach ${nextTier}!`
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
                Donor Dashboard
                </h1>
            </motion.div>
            {renderContent()}
            </div>
        </main>
        </div>
    )
}

export default Donor

