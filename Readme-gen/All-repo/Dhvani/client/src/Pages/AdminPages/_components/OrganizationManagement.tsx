import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Building2, Mail, Phone, XCircle } from "lucide-react"
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

    interface IOrganization {
    _id: string
    name: string
    email: string
    phoneNo?: string
    }

    const OrganizationManagement = () => {
    const [organizations, setOrganizations] = useState<IOrganization[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchOrganizations()
    }, [])

    const fetchOrganizations = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getOrganisation")
        setOrganizations(data.data)
        } catch (error) {
        console.error("Error fetching organizations:", error)
        toast.error("Failed to fetch organizations. Please try again.")
        }
    }

    const handleDelete = async (organizationId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteOrganisation", { data: { organisationId: organizationId } })
        await fetchOrganizations()
        toast.success("Organization deleted successfully.")
        } catch (error) {
        console.error("Error deleting organization:", error)
        toast.error("Failed to delete organization. Please try again.")
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
                <Building2 className="w-6 h-6 mr-2 text-blue-500" />
                Organization Management
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : ""}>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {organizations.map((organization) => (
                    <TableRow
                    key={organization._id}
                    className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                    >
                    <TableCell>
                        <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                        {organization.name}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        {organization.email}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {organization.phoneNo || "N/A"}
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
                                : "bg-red-600 text-gray-300 hover:bg-red-300 hover:text-red-700"
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
                                This action cannot be undone. This will permanently delete the organization's record.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant="secondary">Cancel</Button>
                            </AlertDialogCancel>
                            <Button
                                variant="destructive"
                                className="hover:bg-red-500"
                                onClick={() => handleDelete(organization._id)}
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

export default OrganizationManagement

