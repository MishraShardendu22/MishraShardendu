import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Calendar, User, Phone, Droplet, CheckCircle } from "lucide-react"
import { toast } from "react-hot-toast"

interface IBloodRequest {
    _id: string
    patientId: {
        _id: Types.ObjectId
        name: string
        email: string
        phoneNo?: string
    }
    quantity: string
    type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
    completed: boolean
    createdAt: string
    }

    const OrganizationBloodRequests = () => {
    const [requests, setRequests] = useState<IBloodRequest[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchBloodRequests()
    }, [])

    const fetchBloodRequests = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/getBloodRequests")
        setRequests(data.data)
        } catch (error) {
        console.error("Error fetching blood requests:", error)
        toast.error("Failed to fetch blood requests. Please try again.")
        }
    }

    const handleComplete = async (requestId: string) => {
        try {
        await axiosInstance.patch("/organisation/completeBloodRequest", { requestId })
        await fetchBloodRequests()
        toast.success("Blood request marked as completed")
        } catch (error) {
        console.error("Error completing blood request:", error)
        toast.error("Failed to complete blood request. Please try again.")
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card
            className={`${
            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}
        >
            <CardHeader>
            <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                <Droplet className="w-6 h-6 mr-2 text-red-500" />
                Blood Requests
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/30"}>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Patient</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Blood Type</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {requests.map((request) => (
                    <TableRow key={request._id} className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600 " : "bg-base-300/10"}`}>
                    <TableCell>
                        <div className="flex items-center">
                        <Calendar className={`w-4 h-4 mr-2 ${theme === "light" ? "text-gray-600" : "text-primary"}`} />
                        {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <User className={`w-4 h-4 mr-2 ${theme === "light" ? "text-gray-600" : "text-primary"}`} />
                        {request.patientId.name}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Phone className={`w-4 h-4 mr-2 ${theme === "light" ? "text-gray-600" : "text-primary"}`} />
                        {request.patientId.email}
                        {request.patientId.phoneNo && <br />}
                        {request.patientId.phoneNo}
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge
                        variant="outline"
                        className={`${
                            theme === "light" ? "bg-red-50 text-red-600 border-red-200" : "bg-primary/10 text-primary"
                        }`}
                        >
                        {request.type}
                        </Badge>
                    </TableCell>
                    <TableCell>{request.quantity} ml</TableCell>
                    <TableCell>
                        <Badge
                        variant={request.completed ? "default" : "secondary"}
                        className={request.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                        {request.completed ? "Completed" : "Pending"}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        {!request.completed && (
                        <Button
                            onClick={() => handleComplete(request._id)}
                            className={`${
                            theme === "light"
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                            }`}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete
                        </Button>
                        )}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </motion.div>
    )
}

export default OrganizationBloodRequests

