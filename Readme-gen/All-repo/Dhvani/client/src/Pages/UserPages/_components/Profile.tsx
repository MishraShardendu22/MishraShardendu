import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { User, Mail, Phone, AlertCircle, Calendar, Droplet, Ruler, Weight, UserCheck, MapPin, CreditCard } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface IPatient {
    _id: string
    name: string
    email: string
    phoneNo?: string
    bloodGroup?: string
    dateOfBirth?: string
    gender ?: string
    height ?: number
    weight?: number
    address?: string
    aadharNo?: string
}


const Profile = () => {
        const [patientInfo, setPatientInfo] = useState<IPatient | null>(null)
        const { theme } = useThemeStore()

        useEffect(() => {
        fetchPatientInfo()
        }, [])

        const fetchPatientInfo = async () => {
        try {
            const { data } = await axiosInstance.get("/user/verifyUser")
            setPatientInfo(data.data)
        } catch (error) {
            console.error("Error fetching user info:", error)
        }
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch (error) {
            return dateString
        }
    }

    const getBloodTypeColor = () => {
        return theme === "light" 
            ? "bg-red-50 text-red-700 border-red-200" 
            : "bg-primary/10 text-primary border-primary/30"
    }
return (
    <>
        <div className="container p-4 mx-auto md:p-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="mb-6 md:mb-8"
                        >
                            <h1 className={`text-2xl md:text-4xl font-bold ${
                                theme === "light" ? "text-gray-800" : "text-primary"
                            }`}>
                                User Dashboard
                            </h1>
                        </motion.div>
    
                        {patientInfo && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: 0.1 }}
                                className="mb-6"
                            >
                                <Card className={`${
                                    theme === "light"
                                        ? "bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        : "bg-base-200/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-200"
                                } overflow-hidden`}>
                                    <CardHeader className={`${
                                        theme === "light" 
                                            ? "bg-gray-50 border-b border-gray-200" 
                                            : "bg-base-300/30 border-b border-primary/10"
                                    }`}>
                                        <CardTitle className={`flex items-center text-lg font-semibold ${
                                            theme === "light" ? "text-gray-800" : "text-primary"
                                        }`}>
                                            <div className={`p-2 rounded-lg mr-3 ${
                                                theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                                            }`}>
                                                <User className={`w-5 h-5 ${
                                                    theme === "light" ? "text-gray-600" : "text-primary"
                                                }`} />
                                            </div>
                                            Patient Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {/* Basic Information */}
                                            <div className="space-y-4">
                                                <h3 className={`text-sm font-semibold uppercase tracking-wide ${
                                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                } mb-3`}>Basic Information</h3>
                                                
                                                <div className={`flex items-center p-3 rounded-lg border ${
                                                    theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                }`}>
                                                    <User className={`w-4 h-4 mr-3 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`} />
                                                    <div className="flex-1">
                                                        <span className={`text-xs font-medium uppercase tracking-wide ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`}>Full Name</span>
                                                        <p className={`font-semibold ${
                                                            theme === "light" ? "text-gray-900" : "text-base-content"
                                                        }`}>{patientInfo.name}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className={`flex items-center p-3 rounded-lg border ${
                                                    theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                }`}>
                                                    <Mail className={`w-4 h-4 mr-3 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`} />
                                                    <div className="flex-1">
                                                        <span className={`text-xs font-medium uppercase tracking-wide ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`}>Email Address</span>
                                                        <p className={`font-medium break-all ${
                                                            theme === "light" ? "text-gray-900" : "text-base-content"
                                                        }`}>{patientInfo.email}</p>
                                                    </div>
                                                </div>
    
                                                {patientInfo.phoneNo && (
                                                    <div className={`flex items-center p-3 rounded-lg border ${
                                                        theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                    }`}>
                                                        <Phone className={`w-4 h-4 mr-3 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`} />
                                                        <div className="flex-1">
                                                            <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`}>Phone Number</span>
                                                            <p className={`font-medium ${
                                                                theme === "light" ? "text-gray-900" : "text-base-content"
                                                            }`}>{patientInfo.phoneNo}</p>
                                                        </div>
                                                    </div>
                                                )}
    
                                                {patientInfo.address && (
                                                    <div className={`flex items-start p-3 rounded-lg border ${
                                                        theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                    }`}>
                                                        <MapPin className={`w-4 h-4 mr-3 mt-1 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`} />
                                                        <div className="flex-1">
                                                            <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`}>Address</span>
                                                            <p className={`font-medium ${
                                                                theme === "light" ? "text-gray-900" : "text-base-content"
                                                            }`}>{patientInfo.address}</p>
                                                        </div>
                                                    </div>
                                                )}
    
                                                {patientInfo.aadharNo && (
                                                    <div className={`flex items-center p-3 rounded-lg border ${
                                                        theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                    }`}>
                                                        <CreditCard className={`w-4 h-4 mr-3 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`} />
                                                        <div className="flex-1">
                                                            <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`}>Aadhar Number</span>
                                                            <p className={`font-medium ${
                                                                theme === "light" ? "text-gray-900" : "text-base-content"
                                                            }`}>**** **** {patientInfo.aadharNo.slice(-4)}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
    
                                            {/* Medical Information */}
                                            <div className="space-y-4">
                                                <h3 className={`text-sm font-semibold uppercase tracking-wide ${
                                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                } mb-3`}>Medical Information</h3>
                                                
                                                {patientInfo.bloodGroup && (
                                                    <div className={`p-4 rounded-lg border text-center ${getBloodTypeColor()}`}>
                                                        <div className="flex items-center justify-center mb-2">
                                                            <Droplet className="w-5 h-5 mr-2" />
                                                            <span className="text-xs font-medium tracking-wide uppercase">Blood Type</span>
                                                        </div>
                                                        <p className="text-3xl font-bold">{patientInfo.bloodGroup}</p>
                                                    </div>
                                                )}
    
                                                {patientInfo.gender && (
                                                    <div className={`flex items-center p-3 rounded-lg border ${
                                                        theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                    }`}>
                                                        <UserCheck className={`w-4 h-4 mr-3 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`} />
                                                        <div className="flex-1">
                                                            <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`}>Gender</span>
                                                            <p className={`font-semibold capitalize ${
                                                                theme === "light" ? "text-gray-900" : "text-base-content"
                                                            }`}>{patientInfo.gender}</p>
                                                        </div>
                                                    </div>
                                                )}
    
                                                {patientInfo.dateOfBirth && (
                                                    <div className={`flex items-center p-3 rounded-lg border ${
                                                        theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                    }`}>
                                                        <Calendar className={`w-4 h-4 mr-3 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`} />
                                                        <div className="flex-1">
                                                            <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`}>Date of Birth</span>
                                                            <p className={`font-semibold ${
                                                                theme === "light" ? "text-gray-900" : "text-base-content"
                                                            }`}>{formatDate(patientInfo.dateOfBirth)}</p>
                                                        </div>
                                                    </div>
                                                )}
    
                                                <div className="grid grid-cols-2 gap-3">
                                                    {patientInfo.height && (
                                                        <div className={`flex items-center p-3 rounded-lg border ${
                                                            theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                        }`}>
                                                            <Ruler className={`w-4 h-4 mr-2 ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`} />
                                                            <div className="flex-1">
                                                                <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                                }`}>Height</span>
                                                                <p className={`font-semibold ${
                                                                    theme === "light" ? "text-gray-900" : "text-base-content"
                                                                }`}>{patientInfo.height}cm</p>
                                                            </div>
                                                        </div>
                                                    )}
    
                                                    {patientInfo.weight && (
                                                        <div className={`flex items-center p-3 rounded-lg border ${
                                                            theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                        }`}>
                                                            <Weight className={`w-4 h-4 mr-2 ${
                                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                            }`} />
                                                            <div className="flex-1">
                                                                <span className={`text-xs font-medium uppercase tracking-wide ${
                                                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                                }`}>Weight</span>
                                                                <p className={`font-semibold ${
                                                                    theme === "light" ? "text-gray-900" : "text-base-content"
                                                                }`}>{patientInfo.weight}kg</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
    
                                {!patientInfo.bloodGroup && (
                                    <Alert variant="default" className={`mt-4 border-l-4 ${
                                        theme === "light" 
                                            ? "border-l-red-500 bg-red-50 border-red-200" 
                                            : "border-l-error bg-error/10 border-error/30"
                                    }`}>
                                        <AlertCircle className={`w-4 h-4 ${
                                            theme === "light" ? "text-red-500" : "text-error"
                                        }`} />
                                        <AlertTitle className={`${
                                            theme === "light" ? "text-red-700" : "text-error"
                                        } font-semibold`}>Blood Type Required</AlertTitle>
                                        <AlertDescription className={`${
                                            theme === "light" ? "text-red-600" : "text-error"
                                        }`}>
                                            Please update your profile to include your blood type for accurate blood requests and emergency situations.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </motion.div>
                        )}
                    </div>
    </>
)
}


export default Profile