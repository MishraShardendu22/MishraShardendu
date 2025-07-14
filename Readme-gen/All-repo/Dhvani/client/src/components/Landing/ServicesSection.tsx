"use client"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Brain, Droplet, MapPin, FileText, Activity, ArrowRight, Clock, Shield, Users } from "lucide-react"

const ServicesSection = () => {
    const { theme } = useThemeStore()

    const services = [
        {
        icon: Activity,
        title: "AI Disease Checker",
        description:
            "Get instant health assessments using our advanced AI technology that analyzes your symptoms and medical history.",
        features: ["Symptom Analysis", "Medical History Review", "AI-Powered Diagnosis", "Instant Results"],
        badge: "Most Popular",
        badgeColor: theme === "light" ? "bg-green-100 text-green-800" : "bg-success/20 text-success",
        },
        {
        icon: Stethoscope,
        title: "Medical Report Analysis",
        description:
            "Upload your medical reports for comprehensive analysis including TB screening and other diagnostic evaluations.",
        features: ["TB Detection", "Report Processing", "Expert Analysis", "Secure Storage"],
        badge: "Advanced",
        badgeColor: theme === "light" ? "bg-blue-100 text-blue-800" : "bg-info/20 text-info",
        },
        {
        icon: Brain,
        title: "Stroke Risk Assessment",
        description:
            "Evaluate stroke risk factors with our specialized assessment tool designed for early detection and prevention.",
        features: ["Risk Evaluation", "Prevention Tips", "Health Monitoring", "Expert Consultation"],
        badge: "Specialized",
        badgeColor: theme === "light" ? "bg-purple-100 text-purple-800" : "bg-purple-900 text-slate-200",
        },
        {
        icon: Droplet,
        title: "Blood Bank Network",
        description:
            "Access our extensive blood bank network to check availability and connect with donors in your area.",
        features: ["Real-time Availability", "Donor Network", "Emergency Requests", "Location-based Search"],
        badge: "Essential",
        badgeColor: theme === "light" ? "bg-red-100 text-red-800" : "bg-error/20 text-error",
        },
        {
        icon: MapPin,
        title: "Hospital Finder",
        description:
            "Locate nearby hospitals, clinics, and healthcare facilities with detailed information and directions.",
        features: ["GPS Integration", "Facility Details", "Real-time Directions", "Contact Information"],
        badge: "Convenient",
        badgeColor: theme === "light" ? "bg-orange-100 text-orange-800" : "bg-warning/20 text-warning",
        },
        {
        icon: FileText,
        title: "Health Records Management",
        description: "Securely store, organize, and access all your medical records and health documents in one place.",
        features: ["Secure Storage", "Easy Access", "Document Organization", "Privacy Protection"],
        badge: "Secure",
        badgeColor: theme === "light" ? "bg-cyan-100 text-cyan-800" : "bg-accent/20 text-accent",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
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

    return (
        <section className={`py-16 md:py-24 ${theme === "light" ? "bg-white" : "bg-slate-900"}`}>
        <div className="container px-4 mx-auto md:px-6">
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-16 text-center"
            >
            <motion.div variants={itemVariants}>
                <h2
                className={`text-3xl md:text-5xl font-bold mb-4 ${
                    theme === "light"
                    ? "bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent"
                }`}
                >
                Our Healthcare Services
                </h2>
                <p
                className={`text-lg md:text-xl max-w-3xl mx-auto ${
                    theme === "light" ? "text-gray-600" : "text-slate-300"
                }`}
                >
                Comprehensive healthcare solutions powered by AI technology and designed for your well-being.
                </p>
            </motion.div>
            </motion.div>

            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
            {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                <Card
                    className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                    theme === "light"
                        ? "bg-white border-gray-200 hover:border-red-300"
                        : "bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-primary/50"
                    }`}
                >
                    <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                        <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            theme === "light"
                            ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                            : "bg-gradient-to-br from-primary to-primary/80 text-primary-content"
                        }`}
                        >
                        <service.icon className="w-6 h-6" />
                        </div>
                        <Badge className={service.badgeColor}>{service.badge}</Badge>
                    </div>
                    <CardTitle className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                        {service.title}
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                    <p className={`mb-4 ${theme === "light" ? "text-gray-600" : "text-slate-300"}`}>
                        {service.description}
                    </p>
                    <div className="mb-6 space-y-2">
                        {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                            <div
                            className={`w-1.5 h-1.5 rounded-full mr-3 ${theme === "light" ? "bg-red-500" : "bg-primary"}`}
                            ></div>
                            <span className={`text-sm ${theme === "light" ? "text-gray-700" : "text-slate-300"}`}>
                            {feature}
                            </span>
                        </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        className={`w-full group-hover:shadow-md transition-all duration-300 ${
                        theme === "light"
                            ? "border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                            : "border-slate-600 text-slate-300 hover:border-primary hover:text-primary"
                        }`}
                    >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                    </CardContent>
                </Card>
                </motion.div>
            ))}
            </motion.div>

            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className={`mt-16 p-8 rounded-2xl text-center ${
                theme === "light"
                ? "bg-gradient-to-r from-red-50 to-blue-50 border border-gray-200"
                : "bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600"
            }`}
            >
              <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.4)_0%,transparent_25%),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.4)_0%,transparent_25%)]"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-6">
                            <Shield className={`w-8 h-8 mr-3 ${theme === "light" ? "text-red-500" : "text-red-400"}`} />
                            <h3 className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                                Why Choose Dhvani?
                            </h3>
                        </div>
                        
                        <p className={`text-lg mb-8 max-w-3xl mx-auto ${
                            theme === "light" ? "text-gray-600" : "text-slate-300"
                        }`}>
                            Experience healthcare reimagined with cutting-edge AI technology, uncompromising security, and round-the-clock availability for all your medical needs.
                        </p>

                        <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
                            {[
                                { icon: Clock, label: "24/7 Available", desc: "Always accessible healthcare", color: "emerald" },
                                { icon: Shield, label: "Secure & Private", desc: "Bank-level data protection", color: "blue" },
                                { icon: Users, label: "Expert Support", desc: "Professional medical guidance", color: "purple" }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center ${
                                        theme === "light" ? `bg-${item.color}-100` : `bg-${item.color}-500/20`
                                    }`}>
                                        <item.icon className={`w-8 h-8 text-${item.color}-500`} />
                                    </div>
                                    <h4 className={`font-bold text-lg mb-2 ${
                                        theme === "light" ? "text-gray-900" : "text-white"
                                    }`}>
                                        {item.label}
                                    </h4>
                                    <p className={`text-sm ${
                                        theme === "light" ? "text-gray-600" : "text-slate-300"
                                    }`}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
            </motion.div>
        </div>
        </section>
    )
}

export default ServicesSection
