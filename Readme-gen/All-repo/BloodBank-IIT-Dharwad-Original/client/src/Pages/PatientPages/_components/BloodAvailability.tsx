import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Droplet, MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface IInventory {
    _id: string
    OrganisationId: {
        _id: Types.ObjectId
        name: string
        email: string
        phoneNo: string
    }
    A_P: number
    A_M: number
    B_P: number
    B_M: number
    AB_P: number
    AB_M: number
    O_P: number
    O_M: number
    }

    const BloodAvailability = () => {
    const [bloodAvailable, setBloodAvailable] = useState<IInventory[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchBloodAvailable()
    }, [])

    const fetchBloodAvailable = async () => {
        try {
        const { data } = await axiosInstance.get("/patient/bloodAvailable")
        setBloodAvailable(data.data)
        } catch (error) {
        console.error("Error fetching blood availability:", error)
        }
    }

    const getAvailabilityColor = (quantity: number) => {
        if (quantity > 10) return "bg-green-100 text-green-800"
        if (quantity > 5) return "bg-yellow-100 text-yellow-800"
        return "bg-red-100 text-red-800"
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
                Blood Availability
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-600" : ""}>
                    <TableHead className="font-semibold">Organisation</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">A+</TableHead>
                    <TableHead className="font-semibold">A-</TableHead>
                    <TableHead className="font-semibold">B+</TableHead>
                    <TableHead className="font-semibold">B-</TableHead>
                    <TableHead className="font-semibold">AB+</TableHead>
                    <TableHead className="font-semibold">AB-</TableHead>
                    <TableHead className="font-semibold">O+</TableHead>
                    <TableHead className="font-semibold">O-</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {bloodAvailable.map((inventory) => (
                    <TableRow
                    key={inventory._id}
                    className={`hover:${theme === "light" ? "bg-gray-50 text-gray-500" : "bg-base-300/10"}`}
                    >
                    <TableCell className="font-medium">{inventory.OrganisationId.name}</TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                        <span className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {inventory.OrganisationId.phoneNo}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {inventory.OrganisationId.email}
                        </span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.A_P)}>{inventory.A_P}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.A_M)}>{inventory.A_M}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.B_P)}>{inventory.B_P}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.B_M)}>{inventory.B_M}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.AB_P)}>{inventory.AB_P}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.AB_M)}>{inventory.AB_M}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.O_P)}>{inventory.O_P}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge className={getAvailabilityColor(inventory.O_M)}>{inventory.O_M}</Badge>
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

export default BloodAvailability

