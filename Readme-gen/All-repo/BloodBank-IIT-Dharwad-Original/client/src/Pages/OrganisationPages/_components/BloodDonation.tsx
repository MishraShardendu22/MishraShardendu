import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Droplet, Check } from "lucide-react"
import { toast } from "react-hot-toast"

const BloodDonation = () => {
    const [donationData, setDonationData] = useState({ donorEmail: "", quantity: "", bloodType: "" })
    const { theme } = useThemeStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDonationData({ ...donationData, [e.target.name]: e.target.value })
    }

    const handleBloodTypeChange = (value: string) => {
        setDonationData({ ...donationData, bloodType: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.post("/organisation/addBloodDonated", donationData)
        setDonationData({ donorEmail: "", quantity: "", bloodType: "" })
        toast.success("Blood donation added successfully")
        } catch (error) {
        console.error("Error adding blood donation:", error)
        toast.error("Failed to add blood donation. Please try again.")
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
                Add Blood Donation
            </CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="donorEmail" className="text-gray-600">Donor Email</Label>
                <Input
                    id="donorEmail"
                    name="donorEmail"
                    type="email"
                    placeholder="donor@example.com"
                    value={donationData.donorEmail}
                    onChange={handleChange}
                    className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="quantity" className="text-gray-600">Quantity (ml)</Label>
                <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="450"
                    value={donationData.quantity}
                    onChange={handleChange}
                    className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="bloodType" className="text-gray-600">Blood Type</Label>
                <Select onValueChange={handleBloodTypeChange} value={donationData.bloodType}>
                    <SelectTrigger className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}>
                    <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                        <SelectItem key={type} value={type}>
                        {type}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <Button
                type="submit"
                className={`w-full ${
                    theme === "light"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                >
                <Check className="w-4 h-4 mr-2" /> Add Donation
                </Button>
            </form>
            </CardContent>
        </Card>
        </motion.div>
    )
}

export default BloodDonation

