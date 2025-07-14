import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { User, Mail, Phone, Building2, Edit3, Save, X, Shield } from "lucide-react"
import { toast } from "react-hot-toast"

interface IOrganisation {
    _id: string
    name: string
    email: string
    phoneNo: string
}

const Profile = () => {
    const [orgData, setOrgData] = useState<IOrganisation | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState<IOrganisation | null>(null)
    const [loading, setLoading] = useState(false)
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchOrgData()
    }, [])

    const fetchOrgData = async () => {
        try {
            setLoading(true)
            const { data } = await axiosInstance.get("/organisation/verifyOrganisation")
            setOrgData(data.data)
            setEditData(data.data)
        } catch (error) {
            console.error("Error fetching organisation data:", error)
            toast.error("Failed to load organization data")
        } finally {
            setLoading(false)
        }
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
        if (!isEditing) {
            setEditData(orgData)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editData) {
            setEditData({
                ...editData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSave = async () => {
        if (!editData) return

        try {
            setLoading(true)
            await axiosInstance.put("/organisation/update-org", editData)
            setOrgData(editData)
            setIsEditing(false)
            toast.success("Profile updated successfully")
        } catch (error) {
            console.error("Error updating organisation data:", error)
            toast.error("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    if (loading && !orgData) {
        return (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-64"
            >
                <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
                    <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Loading profile...</p>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="space-y-6 text-slate-800">
            {orgData && (
                <>
                    {/* Main Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.1 }}
                    >
                        <Card className={`${
                            theme === "light" 
                                ? "bg-white border-gray-200 shadow-sm" 
                                : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                        }`}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                                    <Building2 className="w-6 h-6 mr-2 text-primary" />
                                    Organization Profile
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleEditToggle}
                                    className={theme === "light" ? "border-gray-300" : ""}
                                    disabled={loading}
                                >
                                    {isEditing ? (
                                        <>
                                            <X className="w-4 h-4 mr-1" />
                                            Cancel
                                        </>
                                    ) : (
                                        <>
                                            <Edit3 className="w-4 h-4 mr-1" />
                                            Edit
                                        </>
                                    )}
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Organization Name */}
                                <div className="mt-4 space-y-2">
                                    <Label className={`flex items-center ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                        <User className="w-4 h-4 mr-2" />
                                        Organization Name
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            name="name"
                                            value={editData?.name || ""}
                                            onChange={handleInputChange}
                                            className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                                            placeholder="Enter organization name"
                                        />
                                    ) : (
                                        <p className={`text-lg font-medium ${theme === "light" ? "text-gray-800" : ""}`}>
                                            {orgData.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label className={`flex items-center ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email Address
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            name="email"
                                            type="email"
                                            value={editData?.email || ""}
                                            onChange={handleInputChange}
                                            className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                                            placeholder="Enter email address"
                                        />
                                    ) : (
                                        <p className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                            {orgData.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label className={`flex items-center ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                        <Phone className="w-4 h-4 mr-2" />
                                        Phone Number
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            name="phoneNo"
                                            type="tel"
                                            value={editData?.phoneNo || ""}
                                            onChange={handleInputChange}
                                            className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                                            placeholder="Enter phone number"
                                        />
                                    ) : (
                                        <p className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                            {orgData.phoneNo}
                                        </p>
                                    )}
                                </div>

                                {/* Organization ID */}
                                <div className="space-y-2">
                                    <Label className={`flex items-center ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                        <Shield className="w-4 h-4 mr-2" />
                                        Organization ID
                                    </Label>
                                    <p className={`font-mono text-sm ${theme === "light" ? "text-gray-500 bg-gray-50" : "text-gray-400 bg-base-100"} px-3 py-2 rounded-md border`}>
                                        {orgData._id}
                                    </p>
                                </div>

                                {/* Save Button - Only show when editing */}
                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pt-4"
                                    >
                                        <Button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className={`w-full ${
                                                theme === "light"
                                                    ? "bg-primary hover:bg-primary/90 text-white"
                                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                                            }`}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Additional Info Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.2 }}
                    >
                        <Card className={`${
                            theme === "light" 
                                ? "bg-white border-gray-200 shadow-sm" 
                                : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                        }`}>
                            <CardHeader>
                                <CardTitle className={`text-lg ${theme === "light" ? "text-gray-800" : ""}`}>
                                    Account Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-base-100"}`}>
                                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                            Account Status
                                        </p>
                                        <p className="flex items-center mt-1 font-medium text-green-600">
                                            <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                                            Active
                                        </p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-base-100"}`}>
                                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                            Account Type
                                        </p>
                                        <p className={`font-medium mt-1 ${theme === "light" ? "text-gray-800" : ""}`}>
                                            Blood Bank Organization
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </>
            )}
        </div>
    )
}

export default Profile