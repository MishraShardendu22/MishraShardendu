import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Package, Save } from "lucide-react"
import { toast } from "react-hot-toast"

interface IInventory {
    A_P: number
    A_M: number
    B_P: number
    B_M: number
    AB_P: number
    AB_M: number
    O_P: number
    O_M: number
    }

    const InventoryManager = () => {
    const [inventory, setInventory] = useState<IInventory>({
        A_P: 0,
        A_M: 0,
        B_P: 0,
        B_M: 0,
        AB_P: 0,
        AB_M: 0,
        O_P: 0,
        O_M: 0,
    })
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchInventory = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/getInventory")
        setInventory(data.data)
        } catch (error) {
        console.error("Error fetching inventory:", error)
        toast.error("Failed to fetch inventory. Please try again.")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInventory({ ...inventory, [e.target.name]: Number.parseInt(e.target.value) })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.patch("/organisation/updateInventory", inventory)
        await fetchInventory()
        toast.success("Inventory updated successfully")
        } catch (error) {
        console.error("Error updating inventory:", error)
        toast.error("Failed to update inventory. Please try again.")
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
                <Package className="w-6 h-6 mr-2 text-blue-500" />
                Inventory Management
            </CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {Object.entries(inventory).map(([key, value]) => (
                <div key={key}>
                    <Label
                    htmlFor={key}
                    className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
                    >
                    {key.replace("_", " ")}
                    </Label>
                    <Input
                    type="number"
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    min="0"
                    className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                    />
                </div>
                ))}
                <Button
                type="submit"
                className={`col-span-2 ${
                    theme === "light"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                >
                <Save className="w-4 h-4 mr-2" />
                Update Inventory
                </Button>
            </form>
            </CardContent>
        </Card>
        </motion.div>
    )
    }

export default InventoryManager

