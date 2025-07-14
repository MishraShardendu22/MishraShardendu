"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { FileText, Calendar, Download, Activity, Brain, Stethoscope, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Report {
    _id: string
    userId: string
    createdAt: string
}

interface TBReport extends Report {
    file1: string
    file2?: string
    file3?: string
}

interface StrokeReport extends Report {
    data: string
    result: string
}

interface DiseaseDetection extends Report {
    file1: string
    file2?: string
    file3?: string
    currentSymptoms: string
    previousDiseases: string
}

const MyReports = () => {
    const [reports, setReports] = useState<{
        tbReports: TBReport[]
        strokeReports: StrokeReport[]
        diseaseReports: DiseaseDetection[]
    }>({ tbReports: [], strokeReports: [], diseaseReports: [] })
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = async () => {
        try {
            const { data } = await axiosInstance.get("/user/reports")
            setReports(data.data)
        } catch (error) {
            console.error("Error fetching reports:", error)
        }
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch (error) {
            return dateString
        }
    }

    const getFileLinks = (report: TBReport | DiseaseDetection) => {
        const files = []
        if (report.file1) files.push({ name: 'File 1', url: `/user/file/${report.file1}` })
        if (report.file2) files.push({ name: 'File 2', url: `/user/file/${report.file2}` })
        if (report.file3) files.push({ name: 'File 3', url: `/user/file/${report.file3}` })
        return files
    }

    const ReportCard = ({ children, icon, title, count }: { 
        children: React.ReactNode, 
        icon: React.ReactNode, 
        title: string, 
        count: number 
    }) => (
        <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-lg border ${
                theme === "light" 
                    ? "bg-gray-50 border-gray-200" 
                    : "bg-base-300/30 border-primary/10"
            }`}>
                <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                        theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                    }`}>
                        {icon}
                    </div>
                    <h2 className={`text-xl font-semibold ${
                        theme === "light" ? "text-gray-800" : "text-primary"
                    }`}>{title}</h2>
                </div>
                <Badge className={`${
                    theme === "light" 
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                        : "bg-primary/20 text-primary hover:bg-primary/30"
                }`}>
                    {count} Report{count !== 1 ? 's' : ''}
                </Badge>
            </div>
            {children}
        </div>
    )

    const EmptyState = ({ message }: { message: string }) => (
        <div className={`text-center py-8 px-4 rounded-lg border-2 border-dashed ${
            theme === "light" 
                ? "border-gray-300 text-gray-500" 
                : "border-base-300 text-base-content/60"
        }`}>
            <FileText className={`w-12 h-12 mx-auto mb-3 ${
                theme === "light" ? "text-gray-400" : "text-base-content/40"
            }`} />
            <p className="text-sm font-medium">{message}</p>
        </div>
    )

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                            <FileText className={`w-5 h-5 ${
                                theme === "light" ? "text-blue-500" : "text-primary"
                            }`} />
                        </div>
                        Medical Reports
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-8">
                        {/* TB Reports */}
                        <ReportCard 
                            icon={<Stethoscope className={`w-5 h-5 ${
                                theme === "light" ? "text-red-500" : "text-error"
                            }`} />}
                            title="TB Reports" 
                            count={reports.tbReports.length}
                        >
                            {reports.tbReports.length === 0 ? (
                                <EmptyState message="No TB reports available." />
                            ) : (
                                <div className="space-y-3">
                                    {reports.tbReports.map((report) => (
                                        <div key={report._id} className={`p-4 rounded-lg border ${
                                            theme === "light" 
                                                ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm" 
                                                : "bg-base-100/50 border-base-300 hover:border-primary/20 hover:bg-base-100/70"
                                        } transition-all duration-200`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center">
                                                    <Calendar className={`w-4 h-4 mr-2 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`} />
                                                    <span className={`text-sm font-medium ${
                                                        theme === "light" ? "text-gray-600" : "text-base-content/80"
                                                    }`}>
                                                        {formatDate(report.createdAt)}
                                                    </span>
                                                </div>
                                                <Badge variant="outline" className={`${
                                                    theme === "light" 
                                                        ? "border-red-200 text-red-700" 
                                                        : "border-error/30 text-error"
                                                }`}>
                                                    TB Screening
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {getFileLinks(report).map((file, index) => (
                                                    <a 
                                                        key={index}
                                                        href={file.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                                            theme === "light" 
                                                                ? "bg-blue-50 text-blue-700 hover:bg-blue-100" 
                                                                : "bg-primary/10 text-primary hover:bg-primary/20"
                                                        }`}
                                                    >
                                                        <Download className="w-3 h-3 mr-1" />
                                                        {file.name}
                                                        <ExternalLink className="w-3 h-3 ml-1" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ReportCard>

                        {/* Stroke Reports */}
                        <ReportCard 
                            icon={<Brain className={`w-5 h-5 ${
                                theme === "light" ? "text-purple-500" : "text-secondary"
                            }`} />}
                            title="Stroke Reports" 
                            count={reports.strokeReports.length}
                        >
                            {reports.strokeReports.length === 0 ? (
                                <EmptyState message="No stroke reports available." />
                            ) : (
                                <div className="space-y-3">
                                    {reports.strokeReports.map((report) => (
                                        <div key={report._id} className={`p-4 rounded-lg border ${
                                            theme === "light" 
                                                ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm" 
                                                : "bg-base-100/50 border-base-300 hover:border-primary/20 hover:bg-base-100/70"
                                        } transition-all duration-200`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center">
                                                    <Calendar className={`w-4 h-4 mr-2 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`} />
                                                    <span className={`text-sm font-medium ${
                                                        theme === "light" ? "text-gray-600" : "text-base-content/80"
                                                    }`}>
                                                        {formatDate(report.createdAt)}
                                                    </span>
                                                </div>
                                                <Badge variant="outline" className={`${
                                                    theme === "light" 
                                                        ? "border-purple-200 text-purple-700" 
                                                        : "border-secondary/30 text-secondary"
                                                }`}>
                                                    Stroke Analysis
                                                </Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <div className={`p-3 rounded-md ${
                                                    theme === "light" ? "bg-gray-50" : "bg-base-200/50"
                                                }`}>
                                                    <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`}>Input Data</p>
                                                    <p className={`text-sm ${
                                                        theme === "light" ? "text-gray-700" : "text-base-content/90"
                                                    }`}>{report.data}</p>
                                                </div>
                                                <div className={`p-3 rounded-md ${
                                                    theme === "light" ? "bg-gray-50" : "bg-base-200/50"
                                                }`}>
                                                    <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`}>Analysis Result</p>
                                                    <p className={`text-sm font-medium ${
                                                        theme === "light" ? "text-gray-900" : "text-base-content"
                                                    }`}>{report.result}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ReportCard>

                        {/* Disease Detection Reports */}
                        <ReportCard 
                            icon={<Activity className={`w-5 h-5 ${
                                theme === "light" ? "text-green-500" : "text-success"
                            }`} />}
                            title="Disease Detection Reports" 
                            count={reports.diseaseReports.length}
                        >
                            {reports.diseaseReports.length === 0 ? (
                                <EmptyState message="No disease detection reports available." />
                            ) : (
                                <div className="space-y-3">
                                    {reports.diseaseReports.map((report) => (
                                        <div key={report._id} className={`p-4 rounded-lg border ${
                                            theme === "light" 
                                                ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm" 
                                                : "bg-base-100/50 border-base-300 hover:border-primary/20 hover:bg-base-100/70"
                                        } transition-all duration-200`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center">
                                                    <Calendar className={`w-4 h-4 mr-2 ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`} />
                                                    <span className={`text-sm font-medium ${
                                                        theme === "light" ? "text-gray-600" : "text-base-content/80"
                                                    }`}>
                                                        {formatDate(report.createdAt)}
                                                    </span>
                                                </div>
                                                <Badge variant="outline" className={`${
                                                    theme === "light" 
                                                        ? "border-green-200 text-green-700" 
                                                        : "border-success/30 text-success"
                                                }`}>
                                                    Disease Detection
                                                </Badge>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    <div className={`p-3 rounded-md ${
                                                        theme === "light" ? "bg-gray-50" : "bg-base-200/50"
                                                    }`}>
                                                        <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`}>Current Symptoms</p>
                                                        <p className={`text-sm ${
                                                            theme === "light" ? "text-gray-700" : "text-base-content/90"
                                                        }`}>{report.currentSymptoms}</p>
                                                    </div>
                                                    <div className={`p-3 rounded-md ${
                                                        theme === "light" ? "bg-gray-50" : "bg-base-200/50"
                                                    }`}>
                                                        <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
                                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                        }`}>Previous Diseases</p>
                                                        <p className={`text-sm ${
                                                            theme === "light" ? "text-gray-700" : "text-base-content/90"
                                                        }`}>{report.previousDiseases}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {getFileLinks(report).map((file, index) => (
                                                        <a 
                                                            key={index}
                                                            href={file.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                                                theme === "light" 
                                                                    ? "bg-green-50 text-green-700 hover:bg-green-100" 
                                                                    : "bg-success/10 text-success hover:bg-success/20"
                                                            }`}
                                                        >
                                                            <Download className="w-3 h-3 mr-1" />
                                                            {file.name}
                                                            <ExternalLink className="w-3 h-3 ml-1" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ReportCard>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default MyReports