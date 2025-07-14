import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { useUserStore } from "@/store/useUserStore"
import { MapPin} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import NearbyHospitalsMap from "./NearbyHospitalsMap"

const NearbyHospital = () => {
    const user = useUserStore((s) => s.user)
    const { theme } = useThemeStore()
    
    console.log("User's address is : ", user?.address)

    return (
        <div className="container p-4 mx-auto md:p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-6 md:mb-8"
            >
                <h1 className={`text-2xl md:text-4xl font-bold ${
                    theme === "light" ? "text-gray-800" : "text-primary"
                }`}>
                    Nearby Hospitals
                </h1>
                <p className={`mt-2 text-sm md:text-base ${
                    theme === "light" ? "text-gray-600" : "text-base-content/70"
                }`}>
                    Find healthcare facilities near your location
                </p>
            </motion.div>

            {!user?.address ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                >
                    <Alert className={`border-l-4 ${
                        theme === "light" 
                            ? "border-l-orange-500 bg-orange-50 border-orange-200" 
                            : "border-l-warning bg-warning/10 border-warning/30"
                    }`}>
                        <MapPin className={`w-4 h-4 ${
                            theme === "light" ? "text-orange-500" : "text-warning"
                        }`} />
                        <AlertTitle className={`${
                            theme === "light" ? "text-orange-700" : "text-warning"
                        } font-semibold`}>
                            Address Required
                        </AlertTitle>
                        <AlertDescription className={`${
                            theme === "light" ? "text-orange-600" : "text-warning"
                        }`}>
                            Please update your profile with your address to find nearby hospitals and healthcare facilities.
                        </AlertDescription>
                    </Alert>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                >
                    <NearbyHospitalsMap address={user.address} />
                </motion.div>
            )}
        </div>
    )
}

export default NearbyHospital