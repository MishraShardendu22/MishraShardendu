import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    AreaChart,
    Area,
    } from "recharts"
    import axiosInstance from "@/util/axiosInstance"
    import { motion } from "framer-motion"
    import { useThemeStore } from "@/store/themeStore"
    import { Users, UserPlus, Building2, MapPin, Droplet } from "lucide-react"

    interface IAnalytics {
    donors: number
    patients: number
    organisations: number
    donationLocations: number
    bloodRequests: number
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

    const Analytics = () => {
    const [analytics, setAnalytics] = useState<IAnalytics | null>(null)
    const [timeData, setTimeData] = useState<any[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchAnalytics()
        generateMockTimeData()
    }, [])

    const fetchAnalytics = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getAnalytics")
        setAnalytics(data.data)
        } catch (error) {
        console.error("Error fetching analytics:", error)
        }
    }

    const generateMockTimeData = () => {
        const mockData = []
        for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        mockData.push({
            date: date.toISOString().split("T")[0],
            donations: Math.floor(Math.random() * 50) + 10,
            requests: Math.floor(Math.random() * 30) + 5,
        })
        }
        setTimeData(mockData.reverse())
    }

    if (!analytics) return <div>Loading...</div>

    const pieData = [
        { name: "Donors", value: analytics.donors },
        { name: "Patients", value: analytics.patients },
        { name: "Organizations", value: analytics.organisations },
        { name: "Donation Locations", value: analytics.donationLocations },
        { name: "Blood Requests", value: analytics.bloodRequests },
    ]

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
                <Users className="w-6 h-6 mr-2 text-blue-500" />
                Analytics Overview
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <AnalyticItem title="Donors" value={analytics.donors} icon={Users} color="text-blue-500" />
                <AnalyticItem title="Patients" value={analytics.patients} icon={UserPlus} color="text-green-500" />
                <AnalyticItem
                title="Organizations"
                value={analytics.organisations}
                icon={Building2}
                color="text-yellow-500"
                />
                <AnalyticItem
                title="Donation Locations"
                value={analytics.donationLocations}
                icon={MapPin}
                color="text-purple-500"
                />
                <AnalyticItem title="Blood Requests" value={analytics.bloodRequests} icon={Droplet} color="text-red-500" />
            </div>
            </CardContent>
        </Card>

        <Tabs defaultValue="distribution" className="w-full">
            <TabsList className={`${theme === "light" ? "bg-gray-100 text-gray-600" : "bg-base-200/50 backdrop-blur-sm"}`}>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
            </TabsList>
            <TabsContent value="distribution">
            <Card
                className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                }`}
            >
                <CardHeader>
                <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Distribution of Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>
            <TabsContent value="comparison">
            <Card
                className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm text-gray-600"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                }`}
            >
                <CardHeader>
                <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Comparison of Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pieData}>
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
            </TabsContent>
            <TabsContent value="trend">
            <Card
                className={`${
                theme === "light"
                    ? "bg-white border-gray-200 shadow-sm text-gray-600"
                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                }`}
            >
                <CardHeader>
                <CardTitle className={theme === "light" ? "text-gray-800" : ""}>
                    Donation and Request Trends (Last 7 Days)
                </CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="donations"
                        stroke={theme === "light" ? "#ef4444" : "#8884d8"}
                        fill={theme === "light" ? "#fee2e2" : "#8884d8"}
                    />
                    <Area
                        type="monotone"
                        dataKey="requests"
                        stroke={theme === "light" ? "#22c55e" : "#82ca9d"}
                        fill={theme === "light" ? "#dcfce7" : "#82ca9d"}
                    />
                    </AreaChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
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
            <div className={`p-6 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-base-100"}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Icon className={`w-8 h-8 ${color}`} />
                        <div className="space-y-1">
                            <h3 className={`text-sm font-semibold ${theme === "light" ? "text-gray-800" : ""}`}>{title}</h3>
                            <p className={`text-4xl font-bold ${theme === "light" ? "text-gray-900" : "text-primary"}`}>{value}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
export default Analytics

