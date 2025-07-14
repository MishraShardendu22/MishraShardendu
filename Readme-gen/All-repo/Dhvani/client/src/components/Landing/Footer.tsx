import { motion } from "framer-motion"
import {
    Globe,
    Github,
    Mail,
} from "lucide-react"
import { useThemeStore } from "@/store/themeStore"


const teamMembers = [
    {
        name: "Anas",
        role: "Frontend Developer",
        github: "https://github.com/ANAS727189",
    },
    {
        name: "Shardendu",
        role: "FullStack Developer",
        github: "https://github.com/MishraShardendu22",
    },
    {
        name: "Mayank",
        role: "Backend Developer",
        github: "https://github.com/Mayank-8127",
    },
    {
        name: "Saurav",
        role: "AI/ML Developer",
        github: "https://github.com/karkisav",
    },
]


const Footer = () => {
        const { theme } = useThemeStore();
    return (
        <>
                <footer className={`relative ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-base-200 text-slate-200"}`}>
                    <div className="container relative px-6 py-12 mx-auto">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Platform Info */}
                        <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Globe className={`w-6 h-6 ${theme === "light" ? "text-red-500" : "text-red-500"}`} />
                            <span className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>Dhvani</span>
                        </div>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                            Empowering life-saving connections through technology.
                        </p>
                        <div className="flex space-x-4">
                            <a
                            href="#"
                            className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-blue-500"}`}
                            >
                            <Github className="w-5 h-5" />
                            </a>
                            <a
                            href="#"
                            className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-red-500"}`}
                            >
                            <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        </div>
            
                        {/* Quick Links */}
                        <div>
                        <h3 className={`mb-4 text-lg font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>Platform</h3>
                        <ul className="space-y-2">
                            {["Features", "Documentation", "API Reference"].map((item) => (
                            <li key={item}>
                                <a
                                href="#"
                                className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-blue-500"}`}
                                >
                                {item}
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
            
                        {/* Resources */}
                        <div>
                        <h3 className={`mb-4 text-lg font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>Resources</h3>
                        <ul className="space-y-2">
                            {["Blog", "Tutorials", "Support"].map((item) => (
                            <li key={item}>
                                <a
                                href="#"
                                className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-red-500"}`}
                                >
                                {item}
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
            
                        {/* Company */}
                        <div>
                        <h3 className={`mb-4 text-lg font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>Company</h3>
                        <ul className="space-y-2">
                            {["About Us", "Careers", "Contact"].map((item) => (
                            <li key={item}>
                                <a
                                href="#"
                                className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-blue-500"}`}
                                >
                                {item}
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
            
                    {/* Team Section */}
                    <div className={`pt-8 mt-12 border-t ${theme === "light" ? "border-gray-200" : "border-slate-800"}`}>
                        <div className="text-center">
                        <h3 className={`mb-6 text-lg font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
                            Developed by Team Parshu
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member) => (
                            <motion.div
                                key={member.name}
                                className={`p-4 transition-all border rounded-lg group ${
                                theme === "light"
                                    ? "border-gray-200 bg-white hover:border-red-500/50"
                                    : "border-slate-800 bg-slate-900/50 hover:border-blue-500/50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        theme === "light" ? "text-red-500 bg-red-500/10" : "text-red-500 bg-blue-500/10"
                                    }`}
                                    >
                                    {member.name[0]}
                                    </div>
                                    <div className="text-left">
                                    <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-slate-200"}`}>
                                        {member.name}
                                    </p>
                                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                                        {member.role}
                                    </p>
                                    </div>
                                </div>
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 transition-colors ${
                                    theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-red-500"
                                    }`}
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                </div>
                            </motion.div>
                            ))}
                        </div>
                        </div>
                    </div>
            
                    {/* Copyright */}
                    <div
                        className={`pt-8 mt-8 text-center border-t ${theme === "light" ? "border-gray-200" : "border-slate-800"}`}
                    >
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                        © {new Date().getFullYear()} Dhvani. All rights reserved.
                        </p>
                    </div>
                    </div>
                </footer>
        </>
    )
}

export default Footer
