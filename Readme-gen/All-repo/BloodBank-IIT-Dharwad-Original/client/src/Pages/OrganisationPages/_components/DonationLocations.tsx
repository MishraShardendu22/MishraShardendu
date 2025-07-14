import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Clock, Phone, Edit, Trash2, Plus } from "lucide-react"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

interface IDonationLocation {
    _id: string
    organisationId: Types.ObjectId
    name: string
    contactDetails: string
    location: string
    timings: string
    otherDetails?: string
    }

    const DonationLocations = () => {
    const [locations, setLocations] = useState<IDonationLocation[]>([])
    const [newLocation, setNewLocation] = useState({
        name: "",
        contactDetails: "",
        location: "",
        timings: "",
        otherDetails: "",
    })
    const [editingLocation, setEditingLocation] = useState<IDonationLocation | null>(null)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchDonationLocations()
    }, [])

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/getDonationLocations")
        setLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (editingLocation) {
        setEditingLocation({ ...editingLocation, [name]: value })
        } else {
        setNewLocation({ ...newLocation, [name]: value })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.post("/organisation/addDonationLocation", newLocation)
        setNewLocation({ name: "", contactDetails: "", location: "", timings: "", otherDetails: "" })
        setIsAddDialogOpen(false)
        await fetchDonationLocations()
        } catch (error) {
        console.error("Error adding donation location:", error)
        }
    }

    const handleDelete = async (locationId: string) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
        try {
            await axiosInstance.delete("/organisation/deleteDonationLocation", {
            data: { locationId },
            })
            await fetchDonationLocations()
        } catch (error) {
            console.error("Error deleting donation location:", error)
        }
        }
    }

    const handleEdit = (location: IDonationLocation) => {
        setEditingLocation(location)
        setIsEditDialogOpen(true)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingLocation) return

        try {
        await axiosInstance.patch("/organisation/updateDonationLocation", editingLocation)
        setEditingLocation(null)
        setIsEditDialogOpen(false)
        await fetchDonationLocations()
        } catch (error) {
        console.error("Error updating donation location:", error)
        }
    }

    const LocationForm = ({ isEditing = false }) => (
        <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="name">Name</Label>
            <Input
            id="name"
            name="name"
            value={isEditing ? editingLocation?.name : newLocation.name}
            onChange={handleChange}
            className={theme === "light" ? "bg-white border-gray-300" : "bg-base-200"}
            required
            />
        </div>
        <div>
            <Label htmlFor="contactDetails">Contact Details</Label>
            <Input
            id="contactDetails"
            name="contactDetails"
            value={isEditing ? editingLocation?.contactDetails : newLocation.contactDetails}
            onChange={handleChange}
            className={theme === "light" ? "bg-white border-gray-300 text-gray-600" : "bg-base-200"}
            required
            />
        </div>
        <div>
            <Label htmlFor="location">Location</Label>
            <Input
            id="location"
            name="location"
            value={isEditing ? editingLocation?.location : newLocation.location}
            onChange={handleChange}
            className={theme === "light" ? "bg-white border-gray-300 text-gray-600" : "bg-base-200"}
            required
            />
        </div>
        <div>
            <Label htmlFor="timings">Timings</Label>
            <Input
            id="timings"
            name="timings"
            value={isEditing ? editingLocation?.timings : newLocation.timings}
            onChange={handleChange}
            className={theme === "light" ? "bg-white border-gray-300 text-gray-600" : "bg-base-200"}
            required
            />
        </div>
        <div>
            <Label htmlFor="otherDetails">Other Details</Label>
            <Textarea
            id="otherDetails"
            name="otherDetails"
            value={isEditing ? editingLocation?.otherDetails : newLocation.otherDetails}
            onChange={handleChange}
            className={theme === "light" ? "bg-white border-gray-300 text-gray-600" : "bg-base-200"}
            />
        </div>
        <Button
            type="submit"
            className={`w-full ${
            theme === "light"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
        >
            {isEditing ? "Update Location" : "Add Location"}
        </Button>
        </form>
    )

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card
            className={`${
            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}
        >
            <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Donation Locations</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                <Button
                    className={`${
                    theme === "light"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Location
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Donation Location</DialogTitle>
                </DialogHeader>
                <LocationForm />
                </DialogContent>
            </Dialog>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/30"}>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Timings</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {locations.map((loc) => (
                    <TableRow key={loc._id} className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/30"}>
                    <TableCell className="font-medium">{loc.name}</TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {loc.contactDetails}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {loc.location}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {loc.timings}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                        <Button
                            onClick={() => handleEdit(loc)}
                            className={`${
                            theme === "light"
                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                : "bg-primary/20 text-primary hover:bg-primary/30"
                            }`}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => handleDelete(loc._id)}
                            variant="destructive"
                            className={`${
                            theme === "light"
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-destructive/20 text-destructive hover:bg-destructive/30"
                            }`}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Donation Location</DialogTitle>
            </DialogHeader>
            <LocationForm isEditing />
            </DialogContent>
        </Dialog>
        </motion.div>
    )
}

export default DonationLocations

