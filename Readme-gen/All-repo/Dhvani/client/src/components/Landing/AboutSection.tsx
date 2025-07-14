"use client"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Target, Eye, Award, Globe } from "lucide-react"

const AboutSection = () => {
    const { theme } = useThemeStore()

    const values = [
        {
        icon: Heart,
        title: "Compassionate Care",
        description: "We believe that care is the real cure - ख़्याल ही असली इलाज है",
        },
        {
        icon: Target,
        title: "Precision Medicine",
        description: "AI-powered diagnostics for accurate and personalized healthcare solutions",
        },
        {
        icon: Eye,
        title: "Transparency",
        description: "Clear, honest communication about your health and treatment options",
        },
        {
        icon: Award,
        title: "Excellence",
        description: "Committed to delivering the highest quality healthcare services",
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
            duration: 0.6,
            ease: "easeOut",
        },
        },
    }

    return (
        <section
        className={`py-16 md:py-24 ${theme === "light" ? "bg-gradient-to-b from-gray-50 to-white" : "bg-slate-800"}`}
        >
        <div className="container px-4 mx-auto md:px-6">
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            >
            <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
                {/* Left Content */}
                <motion.div variants={itemVariants}>
                <h2
                    className={`text-3xl md:text-5xl font-bold mb-6 ${
                    theme === "light"
                        ? "bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent"
                    }`}
                >
                    About Dhvani
                </h2>
                <div className="mb-8 space-y-4">
                    <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-300"}`}>
                    Dhvani is revolutionizing healthcare accessibility through cutting-edge AI technology and
                    compassionate care. Our platform bridges the gap between patients and quality healthcare services.
                    </p>
                    <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-300"}`}>
                    Founded on the principle that "ख़्याल ही असली इलाज है" (Care is the real cure), we're committed to making
                    healthcare more accessible, affordable, and effective for everyone.
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center">
                    {/* <Users className={`w-6 h-6 mr-3 ${theme === "light" ? "text-red-500" : "text-primary"}`} /> */}
                    {/* <div>
                        <p className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>50,000+</p>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>Happy Users</p>
                    </div> */}
                    </div>
                    <div className="flex items-center">
                    <Globe className={`w-6 h-6 mr-3 ${theme === "light" ? "text-blue-500" : "text-info"}`} />
                    <div>
                        <p className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>Pan-India</p>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>Coverage</p>
                    </div>
                    </div>
                </div>

                <Button
                    className={`px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                    theme === "light"
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-content"
                    }`}
                >
                    Learn More About Us
                </Button>
                </motion.div>

                {/* Right Content - Values */}
                <motion.div variants={itemVariants} className="space-y-6">
                <h3 className={`text-2xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    Our Core Values
                </h3>
                {values.map((value, index) => (
                    <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    >
                    <Card
                        className={`transition-all duration-300 hover:shadow-lg ${
                        theme === "light"
                            ? "bg-white border-gray-200 hover:border-red-300"
                            : "bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-primary/50"
                        }`}
                    >
                        <CardContent className="p-6">
                        <div className="flex items-start">
                            <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                                theme === "light"
                                ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                                : "bg-gradient-to-br from-primary to-primary/80 text-primary-content"
                            }`}
                            >
                            <value.icon className="w-6 h-6" />
                            </div>
                            <div>
                            <h4
                                className={`text-lg font-semibold mb-2 ${
                                theme === "light" ? "text-gray-900" : "text-white"
                                }`}
                            >
                                {value.title}
                            </h4>
                            <p className={`${theme === "light" ? "text-gray-600" : "text-slate-300"}`}>
                                {value.description}
                            </p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </motion.div>
                ))}
                </motion.div>
            </div>
            </motion.div>
        </div>
        </section>
    )
}

export default AboutSection
