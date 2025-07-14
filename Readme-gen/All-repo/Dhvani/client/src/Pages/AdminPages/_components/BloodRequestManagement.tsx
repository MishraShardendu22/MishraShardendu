import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Droplet, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog"

interface IBloodRequest {
    _id: string
    patientId: {
        name: string
        email: string
        phoneNo?: string
    }
    quantity: string
    type: string
    completed: boolean
    createdAt: string
}

const BloodRequestManagement = () => {
    const [requests, setRequests] = useState<IBloodRequest[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchBloodRequests()
    }, [])

    const fetchBloodRequests = async () => {
        try {
            const { data } = await axiosInstance.get("/admin/getBloodRequests")
            setRequests(data.data)
        } catch (error) {
            console.error("Error fetching blood requests:", error)
            toast.error("Failed to fetch blood requests. Please try again.")
        }
    }

    const handleDelete = async (requestId: string) => {
        try {
            await axiosInstance.delete("/admin/deleteBloodRequest", { data: { bloodRequestId: requestId } })
            await fetchBloodRequests()
            toast.success("Blood request deleted successfully.")
        } catch (error) {
            console.error("Error deleting blood request:", error)
            toast.error("Failed to delete blood request. Please try again.")
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}>
                <CardHeader>
                    <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                        <Droplet className="w-6 h-6 mr-2 text-red-500" />
                        Blood Request Management
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : "bg-base-300/10"}>
                                <TableHead className="font-semibold">Patient</TableHead>
                                <TableHead className="font-semibold">Blood Type</TableHead>
                                <TableHead className="font-semibold">Quantity</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Date</TableHead>
                                <TableHead className="font-semibold">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request._id} className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{request.patientId.name}</span>
                                            <span className="text-sm text-gray-500">{request.patientId.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`${theme === "light" ? "bg-red-50 text-red-600 border-red-200" : "bg-primary/10 text-primary"}`}>{request.type}</Badge>
                                    </TableCell>
                                    <TableCell>{request.quantity}</TableCell>
                                    <TableCell>
                                        {request.completed ? (
                                            <Badge variant="secondary" className="text-green-800 bg-green-100">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Completed
                                            </Badge>
                                        ) : (
                                            <Badge variant="default" className="text-yellow-800 bg-yellow-100">
                                                <XCircle className="w-4 h-4 mr-1" />
                                                Pending
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" className={`${theme === "light" ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700" : "bg-destructive/20 text-destructive hover:bg-destructive/30"}`}>
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className={theme === "light" ? "bg-white text-black shadow-lg" : "bg-gray-800 text-white shadow-lg"}>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete the blood request.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel asChild>
                                                        <Button variant="secondary">Cancel</Button>
                                                    </AlertDialogCancel>
                                                    <Button variant="destructive" className="hover:bg-red-500" onClick={() => handleDelete(request._id)}>Delete</Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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

export default BloodRequestManagement
