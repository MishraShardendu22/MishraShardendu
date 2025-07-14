import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    } from "recharts"
    import axiosInstance from "@/util/axiosInstance"
    import { motion } from "framer-motion"
    import { useThemeStore } from "@/store/themeStore"
    import { Activity, Users, Droplet, CheckCircle, Package } from "lucide-react"

    interface IAdminAnalytics {
    donors: number
    patients: number
    organisations: number
    donationLocations: number
    bloodRequests: number
    }

    interface IOrganisationAnalytics {
    // totalDonations: number
    totalRequests: number
    completedRequests: number
    pendingRequests: number
    inventoryStatus: {
        [key: string]: number
    }
    bloodTypeDistribution: {
        [key: string]: number
    }
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#A4DE6C", "#D0ED57"]

    const OrganisationAnalytics = () => {
    const [analytics, setAnalytics] = useState<IOrganisationAnalytics | null>(null)
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/getAnalytics")
        const organisationAnalytics: IAdminAnalytics = data.data

        const orgAnalytics: IOrganisationAnalytics = {
            // totalDonations: Math.floor(Math.random() * 1000),
            totalRequests: organisationAnalytics.bloodRequests,
            completedRequests: Math.floor(organisationAnalytics.bloodRequests * 0.8),
            pendingRequests: Math.floor(organisationAnalytics.bloodRequests * 0.2),
            inventoryStatus: {
            "A+": Math.floor(Math.random() * 100),
            "A-": Math.floor(Math.random() * 50),
            "B+": Math.floor(Math.random() * 100),
            "B-": Math.floor(Math.random() * 50),
            "AB+": Math.floor(Math.random() * 30),
            "AB-": Math.floor(Math.random() * 20),
            "O+": Math.floor(Math.random() * 150),
            "O-": Math.floor(Math.random() * 80),
            },
            bloodTypeDistribution: {
            "A+": 30,
            "A-": 10,
            "B+": 25,
            "B-": 5,
            "AB+": 5,
            "AB-": 2,
            "O+": 18,
            "O-": 5,
            },
        }

        setAnalytics(orgAnalytics)
        } catch (error) {
        console.error("Error fetching analytics:", error)
        }
    }

    if (!analytics) return <div>Loading analytics...</div>

    const inventoryData = Object.entries(analytics.inventoryStatus).map(([name, value]) => ({ name, value }))
    const bloodTypeData = Object.entries(analytics.bloodTypeDistribution).map(([name, value]) => ({ name, value }))

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
        >
        <Card
            className={`${
            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}
        >
            <CardHeader>
            <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                <Activity className="w-6 h-6 mr-2 text-blue-500" />
                Overview
            </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* <AnalyticItem title="Total Donations" value={analytics.totalDonations} icon={Droplet} color="text-red-500" /> */}
            <AnalyticItem title="Total Requests" value={analytics.totalRequests} icon={Users} color="text-blue-500" />
            <AnalyticItem
                title="Completed Requests"
                value={analytics.completedRequests}
                icon={CheckCircle}
                color="text-green-500"
            />
            <AnalyticItem
                title="Pending Requests"
                value={analytics.pendingRequests}
                icon={Activity}
                color="text-yellow-500"
            />
            </CardContent>
        </Card>

        <Card
            className={`${
            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}
        >
            <CardHeader>
            <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                <Package className="w-6 h-6 mr-2 text-green-500" />
                Inventory Status
            </CardTitle>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={theme === "light" ? "#ef4444" : "#8884d8"} />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card
            className={`${
            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}
        >
            <CardHeader>
            <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                <Droplet className="w-6 h-6 mr-2 text-red-500" />
                Blood Type Distribution
            </CardTitle>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie
                    data={bloodTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {bloodTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>
        </motion.div>
    )
    }

    const AnalyticItem = ({
    title,
    value,
    icon: Icon,
    color,
    }: { title: string; value: number; icon: any; color: string }) => {
    const { theme } = useThemeStore()
    return (
        <div className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-base-100"}`}>
        <div className="flex items-center mb-2">
            <Icon className={`h-6 w-6 ${color}`} />
            <h3 className={`ml-2 text-sm font-semibold ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            {title}
            </h3>
        </div>
        <p className={`text-3xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>{value}</p>
        </div>
    )
}

export default OrganisationAnalytics

