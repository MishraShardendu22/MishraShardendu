"use client"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Button } from "@/components/ui/button"
import { Activity, Heart, Shield, Zap, Brain, Users, Monitor, TrendingUp, MapPin, Droplet} from "lucide-react"
import ICUScreenCarousel from "./ScreenCarousel"

const FeaturesSection = () => {
    const { theme } = useThemeStore()

    const features = [{
    icon: Activity,
    label: "AI Disease Checker",
    desc: "Real-time symptom monitoring",
    color: "emerald",
    },
    {
        icon: TrendingUp,
        label: "Medical Report Analysis",
        desc: "AI-driven diagnostic insights",
        color: "blue",
    },
    {
        icon: Brain,
        label: "Stroke Risk Assessment",
        desc: "Personalized risk visualization",
        color: "purple",
    },
    {
        icon: Droplet,
        label: "Blood Bank Network",
        desc: "Instant donor availability maps",
        color: "red",
    },
    {
        icon: MapPin,
        label: "Hospital Finder",
        desc: "Nearest facility locator",
        color: "orange",
    },
    {
        icon: Shield,
        label: "Health Records Management",
        desc: "Secure, centralized health vault",
        color: "cyan",
    },
];


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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
    const carouselVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
            },
        },
    }

    const floatingVariants = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <section className={`relative py-24 md:py-32 overflow-hidden ${
            theme === "light" 
                ? "bg-gradient-to-br from-slate-50 via-white to-blue-50" 
                : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        }`}>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating medical icons */}
                <motion.div
                    variants={floatingVariants}
                    animate="float"
                    className={`absolute top-20 left-10 w-8 h-8 ${
                        theme === "light" ? "text-red-200" : "text-red-400/20"
                    }`}
                >
                    <Heart className="w-full h-full" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="float"
                    style={{ animationDelay: "2s" }}
                    className={`absolute top-40 right-16 w-6 h-6 ${
                        theme === "light" ? "text-blue-200" : "text-blue-400/20"
                    }`}
                >
                    <Activity className="w-full h-full" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="float"
                    style={{ animationDelay: "4s" }}
                    className={`absolute bottom-32 left-20 w-7 h-7 ${
                        theme === "light" ? "text-emerald-200" : "text-emerald-400/20"
                    }`}
                >
                    <Shield className="w-full h-full" />
                </motion.div>

                {/* Gradient orbs */}
                <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                    theme === "light" 
                        ? "bg-gradient-to-br from-red-400 to-pink-400"
                        : "bg-gradient-to-br from-red-500/30 to-pink-500/30"
                }`}></div>
                <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
                    theme === "light"
                        ? "bg-gradient-to-br from-blue-400 to-cyan-400"
                        : "bg-gradient-to-br from-blue-500/30 to-cyan-500/30"
                }`}></div>
            </div>

            <div className="container relative z-10 px-4 mx-auto md:px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants}>
                        {/* Section badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                            theme === "light"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-medium">Powered by AI</span>
                        </div>

                        <h2 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
                            theme === "light"
                                ? "bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent"
                                : "bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent"
                        }`}>
                            Comprehensive Healthcare
                            <br />
                            <span className={`text-3xl md:text-5xl ${
                                theme === "light" ? "text-red-600" : "text-red-400"
                            }`}>Solutions</span>
                        </h2>

                        <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                            theme === "light" ? "text-gray-600" : "text-slate-300"
                        }`}>
                            Experience the future of healthcare with our AI-powered platform designed to make quality healthcare accessible to everyone, everywhere.
                        </p>
                    </motion.div>
                </motion.div>
            
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true}}
            variants={containerVariants}
            className={`flex flex-col lg:flex-row justify-between lg:gap-12 p-6 lg:p-8 rounded-2xl ${
                theme === "light" 
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200" 
                    : "bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600"
            }`}
        > 
            <motion.div 
                variants={itemVariants}
                className="flex-1 space-y-4"
            >
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            theme === "light"
                                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                                : "bg-gradient-to-br from-primary to-primary/80 text-primary-content"
                        }`}>
                            <Monitor className="w-5 h-5" />
                        </div>
                        <h3 className={`text-2xl lg:text-3xl font-bold ${
                            theme === "light" ? "text-gray-900" : "text-white"
                        }`}>
                            Advanced ICU Monitoring
                        </h3>
                    </div>
                    
                    <p className={`text-lg lg:text-xl leading-relaxed ${
                        theme === "light" ? "text-gray-600" : "text-slate-300"
                    }`}>
                    Discover Dhvani: Your AI-Powered Healthcare Companion
                    Whether you need AI-driven disease checks, expert report analysis, or on-demand blood donor access, Dhvani unites all your wellness needs in one secure platform.
                    Enjoy 24/7 availability, bank-grade privacy, and intuitive tools at your fingertips.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className={`p-4 rounded-xl ${
                            theme === "light" 
                                ? "bg-white/70 backdrop-blur-sm border border-gray-200" 
                                : "bg-slate-800/50 backdrop-blur-sm border border-slate-600"
                        }`}>
                            <feature.icon className={`w-6 h-6 mb-2 text-${feature.color}-500`} />
                            <h4 className={`font-semibold text-sm mb-1 ${
                                theme === "light" ? "text-gray-900" : "text-white"
                            }`}>
                                {feature.label}
                            </h4>
                            <p className={`text-xs ${
                                theme === "light" ? "text-gray-600" : "text-slate-400"
                            }`}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={`p-4 rounded-lg border-l-4 ${
                    theme === "light" 
                        ? "bg-blue-50 border-blue-500 text-blue-800" 
                        : "bg-blue-900/20 border-blue-400 text-blue-300"
                }`}>
                    <p className="text-sm font-medium">
                        💡 <strong>Accuracy & Disclaimer:</strong> While our AI provides rapid insights, it's not a substitute for professional medical advice—always consult a healthcare provider for definitive diagnosis.
                    </p>
                </div>
            </motion.div>
            
            <motion.div 
                variants={carouselVariants}
                className="flex-1 w-full lg:w-auto"
            >
                <div className={`p-1 rounded-2xl ${
                    theme === "light" 
                        ? "bg-gradient-to-r from-blue-200 to-indigo-200" 
                        : "bg-gradient-to-r from-slate-600 to-slate-500"
                }`}>
                    <ICUScreenCarousel />
                </div>
            </motion.div>
        </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className={`mt-20 p-12 rounded-3xl text-center relative overflow-hidden ${
                        theme === "light"
                            ? "bg-gradient-to-r from-red-50 via-white to-blue-50 border border-gray-200/50"
                            : "bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 border border-slate-600/50"
                    }`}
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className={`absolute inset-0 ${
                            theme === "light"
                                ? "bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.3)_0%,transparent_25%),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_0%,transparent_25%)]"
                                : "bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.2)_0%,transparent_25%),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.2)_0%,transparent_25%)]"
                        }`}></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-6">
                            <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${
                                theme === "light"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-red-500/20 text-red-400"
                            }`}>
                                <Brain className="w-5 h-5" />
                                <span className="font-semibold">AI-Powered Healthcare</span>
                                <Users className="w-5 h-5" />
                            </div>
                        </div>

                        <h3 className={`text-3xl font-bold mb-4 ${
                            theme === "light" ? "text-gray-900" : "text-white"
                        }`}>
                            Ready to Transform Your Healthcare Experience?
                        </h3>

                        <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                            theme === "light" ? "text-gray-600" : "text-slate-300"
                        }`}>
                            Join thousands of users who trust Dhvani for their healthcare needs. Get started today and experience the future of medical care.
                        </p>

                        <Button
                            size="lg"
                            className={`px-12 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                                theme === "light"
                                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                            }`}
                        >
                            Explore All Features
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturesSection