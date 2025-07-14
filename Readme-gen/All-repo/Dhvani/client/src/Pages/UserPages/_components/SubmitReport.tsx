"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Upload, FileText, Activity, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "react-hot-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

const SubmitReport = () => {
    const [reportType, setReportType] = useState<"tb" | "stroke">("tb")
    const [tbFiles, setTbFiles] = useState<File[]>([])
    const [strokeData, setStrokeData] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { theme } = useThemeStore()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).slice(0, 3)
        setTbFiles(files)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (reportType === "tb" && tbFiles.length === 0) {
            toast.error("At least one file is required for TB report.")
            return
        }
        if (reportType === "stroke" && !strokeData.trim()) {
            toast.error("Data is required for Stroke report.")
            return
        }

        setIsSubmitting(true)
        try {
            if (reportType === "tb") {
                const data = new FormData()
                tbFiles.forEach((file) => data.append("files", file))
                await axiosInstance.post("/user/tb-report", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                setTbFiles([])
            } else {
                await axiosInstance.post("/user/stroke-report", { data: strokeData })
                setStrokeData("")
            }
            toast.success(`${reportType === "tb" ? "TB" : "Stroke"} report submitted successfully.`)
        } catch (error) {
            console.error(`Error submitting ${reportType} report:`, error)
            toast.error(`Failed to submit ${reportType} report. Please try again.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const removeFile = (index: number) => {
        setTbFiles(prev => prev.filter((_, i) => i !== index))
    }

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
                    Submit Medical Report
                </h1>
                <p className={`mt-2 text-sm ${
                    theme === "light" ? "text-gray-600" : "text-base-content/70"
                }`}>
                    Upload your medical reports for analysis and diagnosis
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
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
                                <Upload className={`w-5 h-5 ${
                                    theme === "light" ? "text-purple-600" : "text-primary"
                                }`} />
                            </div>
                            Medical Report Submission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Report Type Selection */}
                            <div className="space-y-2">
                                <label className={`text-sm font-semibold uppercase tracking-wide ${
                                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                                }`}>
                                    Report Type
                                </label>
                                <Select 
                                    value={reportType} 
                                    onValueChange={(value: "tb" | "stroke") => {
                                        setReportType(value)
                                        setTbFiles([])
                                        setStrokeData("")
                                    }}
                                >
                                    <SelectTrigger className={`w-full ${
                                        theme === "light" 
                                            ? "bg-white border-gray-300 hover:border-gray-400" 
                                            : "bg-base-100 border-base-300 hover:border-primary/50"
                                    } transition-colors`}>
                                        <SelectValue placeholder="Select report type" />
                                    </SelectTrigger>
                                    <SelectContent className={
                                        theme === "light" ? "bg-white border-gray-200" : "bg-base-100 border-base-300"
                                    }>
                                        <SelectItem 
                                            value="tb"
                                            className={`hover:${
                                                theme === "light" ? "bg-gray-100" : "bg-base-200"
                                            } cursor-pointer`}
                                        >
                                            <div className="flex items-center text-slate-900">
                                                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                                                TB (Tuberculosis) Report
                                            </div>
                                        </SelectItem>
                                        <SelectItem 
                                            value="stroke"
                                            className={`hover:${
                                                theme === "light" ? "bg-gray-100" : "bg-base-200"
                                            } cursor-pointer`}
                                        >
                                            <div className="flex items-center text-slate-900">
                                                <Activity className="w-4 h-4 mr-2 text-red-500" />
                                                Stroke Analysis Report
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* TB Report Section */}
                            {reportType === "tb" && (
                                <div className="space-y-4">
                                    <div className={`p-4 rounded-lg border-2 border-dashed ${
                                        theme === "light" 
                                            ? "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50" 
                                            : "border-base-300 bg-base-100/50 hover:border-primary hover:bg-primary/5"
                                    } transition-all duration-200`}>
                                        <div className="text-center">
                                            <Upload className={`w-8 h-8 mx-auto mb-2 ${
                                                theme === "light" ? "text-gray-400" : "text-base-content/50"
                                            }`} />
                                            <label className={`block text-sm font-medium cursor-pointer ${
                                                theme === "light" ? "text-gray-700" : "text-base-content"
                                            }`}>
                                                <Input
                                                    type="file"
                                                    multiple
                                                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                Upload TB Report Files
                                            </label>
                                            <p className={`text-xs mt-1 ${
                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                            }`}>
                                                Select up to 3 files (JPG, PNG, PDF, DOC)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Selected Files Display */}
                                    {tbFiles.length > 0 && (
                                        <div className="space-y-2">
                                            <label className={`text-sm font-semibold uppercase tracking-wide ${
                                                theme === "light" ? "text-gray-500" : "text-base-content/70"
                                            }`}>
                                                Selected Files ({tbFiles.length}/3)
                                            </label>
                                            {tbFiles.map((file, index) => (
                                                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                                                    theme === "light" ? "bg-white border-gray-200" : "bg-base-100/50 border-base-300"
                                                }`}>
                                                    <div className="flex items-center">
                                                        <FileText className={`w-4 h-4 mr-2 ${
                                                            theme === "light" ? "text-blue-500" : "text-primary"
                                                        }`} />
                                                        <span className={`text-sm ${
                                                            theme === "light" ? "text-gray-700" : "text-base-content"
                                                        }`}>
                                                            {file.name}
                                                        </span>
                                                        <span className={`text-xs ml-2 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`}>
                                                            ({Math.round(file.size / 1024)} KB)
                                                        </span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFile(index)}
                                                        className={`text-red-500 hover:text-red-700 hover:${
                                                            theme === "light" ? "bg-red-50" : "bg-red-500/10"
                                                        }`}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {tbFiles.length === 0 && (
                                        <Alert className={`border-l-4 ${
                                            theme === "light" 
                                                ? "border-l-orange-500 bg-orange-50 border-orange-200" 
                                                : "border-l-warning bg-warning/10 border-warning/30"
                                        }`}>
                                            <AlertCircle className={`w-4 h-4 ${
                                                theme === "light" ? "text-orange-500" : "text-warning"
                                            }`} />
                                            <AlertDescription className={`${
                                                theme === "light" ? "text-orange-700" : "text-warning"
                                            }`}>
                                                At least one file is required for TB report submission.
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            )}

                            {/* Stroke Report Section */}
                            {reportType === "stroke" && (
                                <div className="space-y-2">
                                    <label className={`text-sm font-semibold uppercase tracking-wide ${
                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                    }`}>
                                        Stroke Report Data
                                    </label>
                                    <Textarea
                                        placeholder="Enter detailed stroke report data, symptoms, medical history, and any relevant information..."
                                        value={strokeData}
                                        onChange={(e) => setStrokeData(e.target.value)}
                                        className={`min-h-[120px] ${
                                            theme === "light" 
                                                ? "bg-white border-gray-300 focus:border-red-400" 
                                                : "bg-base-100 border-base-300 focus:border-primary"
                                        } transition-colors`}
                                        rows={6}
                                    />
                                    <p className={`text-xs ${
                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                    }`}>
                                        Provide comprehensive information for accurate analysis
                                    </p>

                                    {!strokeData.trim() && (
                                        <Alert className={`border-l-4 ${
                                            theme === "light" 
                                                ? "border-l-orange-500 bg-orange-50 border-orange-200" 
                                                : "border-l-warning bg-warning/10 border-warning/30"
                                        }`}>
                                            <AlertCircle className={`w-4 h-4 ${
                                                theme === "light" ? "text-orange-500" : "text-warning"
                                            }`} />
                                            <AlertDescription className={`${
                                                theme === "light" ? "text-orange-700" : "text-warning"
                                            }`}>
                                                Detailed report data is required for stroke analysis.
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting || (reportType === "tb" && tbFiles.length === 0) || (reportType === "stroke" && !strokeData.trim())}
                                className={`w-full h-12 text-base font-semibold ${
                                    theme === "light"
                                        ? "bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-300"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-base-300"
                                } transition-all duration-200 disabled:cursor-not-allowed`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Submit {reportType === "tb" ? "TB" : "Stroke"} Report
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default SubmitReport