import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { MapPin, Building2, Phone, Clock, XCircle } from "lucide-react"
import { toast } from "react-hot-toast"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    } from "@/components/ui/alert-dialog"

    interface IDonationLocation {
    _id: string
    name: string
    contactDetails: string
    location: string
    timings: string
    organisationId: {
        name: string
    }
    }

    const DonationLocationManagement = () => {
    const [locations, setLocations] = useState<IDonationLocation[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchDonationLocations()
    }, [])

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getDonationLocations")
        setLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        toast.error("Failed to fetch donation locations. Please try again.")
        }
    }

    const handleDelete = async (locationId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteDonationLocation", { data: { donationLocationId: locationId } })
        await fetchDonationLocations()
        toast.success("Donation location deleted successfully.")
        } catch (error) {
        console.error("Error deleting donation location:", error)
        toast.error("Failed to delete donation location. Please try again.")
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
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Donation Location Management
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : ""}>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Organization</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Timings</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {locations.map((location) => (
                    <TableRow
                    key={location._id}
                    className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                    >
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                        {location.organisationId.name}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {location.location}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        {location.timings}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {location.contactDetails}
                        </div>
                    </TableCell>
                    <TableCell>
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            variant="destructive"
                            className={`${
                                theme === "light"
                                ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                                : "bg-destructive/20 text-destructive hover:bg-destructive/30"
                            }`}
                            >
                            <XCircle className="w-4 h-4 mr-2" />
                            Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                            className={
                            theme === "light" ? "bg-white text-black shadow-lg" : "bg-gray-800 text-white shadow-lg"
                            }
                        >
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the donation location.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant="secondary">Cancel</Button>
                            </AlertDialogCancel>
                            <Button
                                variant="destructive"
                                className="hover:bg-red-500"
                                onClick={() => handleDelete(location._id)}
                            >
                                Delete
                            </Button>
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

export default DonationLocationManagement

