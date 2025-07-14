"use client"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Users, Hospital, FileText, Heart } from "lucide-react"

const StatsSection = () => {
    const { theme } = useThemeStore()

    const stats = [
        {
        icon: Users,
        number: "50,000+",
        label: "Active Users",
        description: "Trust our platform for their healthcare needs",
        },
        {
        icon: Hospital,
        number: "1,200+",
        label: "Partner Hospitals",
        description: "Connected healthcare facilities nationwide",
        },
        {
        icon: FileText,
        number: "100,000+",
        label: "Reports Analyzed",
        description: "AI-powered medical assessments completed",
        },
        {
        icon: Heart,
        number: "99.9%",
        label: "Uptime",
        description: "Reliable healthcare services 24/7",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
        },
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
        },
    }

    return (
        <section
        className={`py-16 md:py-24 ${
            theme === "light" ? "bg-gradient-to-r from-red-50 via-white to-blue-50" : "bg-slate-800"
        }`}
        >
        <div className="container px-4 mx-auto md:px-6">
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-16 text-center"
            >
            </motion.div>

            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
            {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    theme === "light"
                        ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                        : "bg-gradient-to-br from-primary to-primary/80 text-primary-content"
                    }`}
                >
                    <stat.icon className="w-8 h-8" />
                </div>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                    <h3
                    className={`text-3xl md:text-4xl font-bold mb-2 ${
                        theme === "light"
                        ? "bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
                        : "text-primary"
                    }`}
                    >
                    {stat.number}
                    </h3>
                    <p className={`text-lg font-semibold mb-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {stat.label}
                    </p>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-300"}`}>
                    {stat.description}
                    </p>
                </motion.div>
                </motion.div>
            ))}
            </motion.div>
        </div>
        </section>
    )
}

export default StatsSection
