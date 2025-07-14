import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { ClipboardList, Calendar, Droplet, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"

interface IBloodRequest {
    _id: string
    patientId: Types.ObjectId
    quantity: string
    type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
    completed: boolean
    createdAt: string
    }

    const PatientBloodRequests = () => {
    const [bloodRequests, setBloodRequests] = useState<IBloodRequest[]>([])
    const [newRequest, setNewRequest] = useState({ bloodGroup: "", units: "" })
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchBloodRequests()
    }, [])

    const fetchBloodRequests = async () => {
        try {
        const { data } = await axiosInstance.get("/patient/bloodRequests")
        setBloodRequests(data.data)
        } catch (error) {
        console.error("Error fetching blood requests:", error)
        toast.error("Failed to fetch blood requests. Please try again.")
        }
    }

    const handleNewRequestChange = (field: string, value: string) => {
        setNewRequest({ ...newRequest, [field]: value })
    }

    const handleSubmitRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.post("/patient/bloodRequest", newRequest)
        setNewRequest({ bloodGroup: "", units: "" })
        await fetchBloodRequests()
        toast.success("Blood request submitted successfully.")
        } catch (error) {
        console.error("Error submitting blood request:", error)
        toast.error("Failed to submit blood requests. Please try again.")
        }
    }

    const handleDeleteRequest = async (requestId: string) => {
        try {
        await axiosInstance.delete(`/patient/bloodRequest/${requestId}`)
        await fetchBloodRequests()
        toast.success("Blood request deleted successfully.")
        } catch (error) {
        console.error("Error deleting blood request:", error)
        toast.error("Failed to delete blood requests. Please try again.")
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
                <ClipboardList className="w-6 h-6 mr-2 text-blue-500" />
                My Blood Requests
            </CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmitRequest} className="mb-6 space-y-4">
                <div className="w-full">
                <Select
                    value={newRequest.bloodGroup}
                    onValueChange={(value) => handleNewRequestChange("bloodGroup", value)}
                >
                    <SelectTrigger className={`w-full ${theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}`}>
                    <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent className={theme === "light" ? "bg-white text-gray-600" : "bg-base-100"}>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                        <SelectItem
                        key={type}
                        value={type}
                        className={`hover:${theme === "light" ? "bg-gray-100" : "bg-base-200"}`}
                        >
                        {type}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <Input
                type="number"
                placeholder="Units required"
                value={newRequest.units}
                onChange={(e) => handleNewRequestChange("units", e.target.value)}
                className={`w-full ${theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}`}
                />
                <Button
                type="submit"
                className={`w-full ${
                    theme === "light"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                >
                <Droplet className="w-4 h-4 mr-2" />
                Submit Request
                </Button>
            </form>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-600" : ""}>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Blood Type</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {bloodRequests.map((request) => (
                    <TableRow
                    key={request._id}
                    className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                    >
                    <TableCell>
                        <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge
                        variant="outline"
                        className={`${
                            theme === "light" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-primary/10 text-primary"
                        }`}
                        >
                        {request.type}
                        </Badge>
                    </TableCell>
                    <TableCell>{request.quantity} units</TableCell>
                    <TableCell>
                        {request.completed ? (
                        <Badge variant="secondary" className="text-green-800 bg-green-100">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                        </Badge>
                        ) : (
                        <Badge variant="default" className="text-yellow-800 bg-yellow-100">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Pending
                        </Badge>
                        )}
                    </TableCell>
                    <TableCell>
                        {!request.completed && (
                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteRequest(request._id)}
                            className={`${
                            theme === "light"
                                ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                                : "bg-destructive/20 text-destructive hover:bg-destructive/30"
                            }`}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel
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

export default PatientBloodRequests

