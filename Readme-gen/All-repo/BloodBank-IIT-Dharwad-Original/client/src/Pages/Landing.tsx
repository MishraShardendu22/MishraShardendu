import type React from "react"
import { useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
const INDIA_GEO_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Andhra Pradesh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[83.0, 18.0], [84.0, 18.0], [84.0, 17.0], [83.0, 17.0], [83.0, 18.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Karnataka" },
      geometry: {
        type: "Polygon",
        coordinates: [[[75.0, 15.0], [77.0, 15.0], [77.0, 13.0], [75.0, 13.0], [75.0, 15.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Tamil Nadu" },
      geometry: {
        type: "Polygon",
        coordinates: [[[77.0, 13.0], [79.0, 13.0], [79.0, 11.0], [77.0, 11.0], [77.0, 13.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Kerala" },
      geometry: {
        type: "Polygon",
        coordinates: [[[75.0, 12.0], [77.0, 12.0], [77.0, 8.0], [75.0, 8.0], [75.0, 12.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Maharashtra" },
      geometry: {
        type: "Polygon",
        coordinates: [[[72.0, 20.0], [78.0, 20.0], [78.0, 18.0], [72.0, 18.0], [72.0, 20.0]]]
      }
    }
  ]
};

import {
  Heart,
  Droplets,
  ArrowRight,
  Globe,
  Clock,
  Activity,
  Users,
  ChevronDown,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  Shield,
  Github,
  Mail,
  Contact
} from "lucide-react"
import { useThemeStore } from "@/store/themeStore"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"

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
    name: "Saurav",
    role: "AI/ML Developer",
    github: "https://github.com/karkisav",
  },
  {
    name: "Mayank",
    role: "Backend Developer",
    github: "https://github.com/Mayank-8127",
                      },
]

interface BloodTypeCardProps {
  type: string
  availability: number
  theme: string
}

const BloodTypeCard: React.FC<BloodTypeCardProps> = ({ type, availability, theme }) => {
  const percentage = availability
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 text-center rounded-lg ${
        theme === "light" ? "bg-white shadow-sm border border-gray-100" : "bg-base-100/50 backdrop-blur-sm"
      }`}
    >
      <div className="relative w-20 h-20 mx-auto mb-3">
        <Droplets className={`w-full h-full ${theme === "light" ? "text-red-500/20" : "text-primary/20"}`} />
        <span
          className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${
            theme === "light" ? "text-gray-900" : ""
          }`}
        >
          {type}
        </span>
      </div>
      <div className={`w-full h-2 mb-2 rounded-full ${theme === "light" ? "bg-gray-200" : "bg-base-300"}`}>
        <div
          className={`h-full rounded-full ${theme === "light" ? "bg-red-500" : "bg-primary"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-sm ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>{availability}% Available</p>
    </motion.div>
  )
}

const Landing = () => {
  const navigate = useNavigate()
  const { theme } = useThemeStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tooltipContent, setTooltipContent] = useState("");
  const [hoveredState, setHoveredState] = useState(null);

  const handleNavigation = (path: string) => {
    navigate(path)
  }

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const features = [
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connect with donors and recipients worldwide through our extensive network of blood banks and hospitals.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about urgent blood requirements and donation opportunities in your area.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of dedicated donors and volunteers committed to saving lives.",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description: "Find the nearest blood donation centers and track blood availability in real-time.",
    },
  ]

  return (
    <div
      className={`relative min-h-screen ${theme}`}
      data-theme={theme === "dark" ? "bloodsphere-dark" : "bloodsphere-light"}
    >

      <Navbar />


      <motion.section
        className={`min-h-screen hero ${theme === "light" ? "bg-white text-gray-900" : "text-white"}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
          >
            <div
              className={`absolute inset-0 ${theme === "light" ? "bg-[radial-gradient(circle_500px_at_50%_50%,rgba(220,38,38,0.05),transparent)]" : "bg-[radial-gradient(circle_500px_at_50%_50%,rgba(220,38,38,0.1),transparent)]"}`}
            />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] h-full w-full">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className={`border-[0.5px] ${theme === "light" ? "border-red-500/10" : "border-primary/20"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex-col gap-16 hero-content lg:flex-row-reverse max-w-7xl">
          <motion.div variants={itemVariants} className="relative max-w-xl">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${theme === "light" ? "from-red-500 to-orange-500" : "from-primary to-accent"} rounded-full blur-[100px] ${theme === "light" ? "opacity-10" : "opacity-20"}`}
            />
            <motion.div
              className="relative z-10 grid grid-cols-2 gap-6"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {[
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Under 30 mins",
                  description: "Average emergency response",
                },
                { icon: Activity, label: "Success Rate", value: "99.9%", description: "Successful donations" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 border rounded-lg shadow-lg ${
                    theme === "light"
                      ? "bg-white/50 backdrop-blur-sm border-gray-100"
                      : "bg-base-200/50 backdrop-blur-sm border-base-content/5"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 mr-4 rounded-full ${theme === "light" ? "bg-red-500/10" : "bg-primary/10"}`}>
                      <stat.icon className={`w-6 h-6 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
                        {stat.label}
                      </h3>
                      <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-base-content/70"}`}>
                        {stat.description}
                      </p>
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${theme === "light" ? "text-red-500" : "text-primary"}`}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl">
            <motion.div
              className={`gap-2 p-4 mb-8 text-lg badge ${
                theme === "light" ? "badge-outline border-red-500 text-red-500" : "badge-primary badge-outline"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-5 h-5" />
              Save Lives Today
            </motion.div>

            <h1 className="mb-8 text-6xl font-bold leading-tight lg:text-7xl">
              Your Blood
              <span className={`block ${theme === "light" ? "text-red-500" : "text-primary"}`}>Their Hope</span>
            </h1>

            <p className={`mb-8 text-xl ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
              Join our global network of life-savers. Every donation can save up to three lives and bring hope to
              families in need.
            </p>

            <div className="flex flex-wrap gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className={`relative gap-2 px-6 py-3 overflow-hidden text-lg font-semibold text-white transition-all duration-300 ease-out rounded-lg btn-lg group ${
                      theme === "light" ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                    } hover:scale-105`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 opacity-0 ${
                        theme === "light"
                          ? "bg-gradient-to-r from-red-500 to-red-600"
                          : "bg-gradient-to-r from-primary to-primary/80"
                      } group-hover:opacity-100`}
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={`z-50 max-w-md mx-auto border shadow-xl ${
                    theme === "light" ? "bg-white border-gray-100" : "bg-slate-900 border-slate-800"
                  } rounded-xl`}
                >
                  <DialogHeader>
                    <DialogTitle
                      className={`flex items-center gap-2 text-2xl font-bold ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
                      Choose Your Role
                    </DialogTitle>
                    <DialogDescription className={`mt-2 ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                      Select how you would like to contribute to saving lives
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-6">
                    {[
                      {
                        icon: Contact,
                        label: "Admin",
                        description: "Manage users, monitor donations, and oversee platform operations",
                        path: "/admin/dashboard",
                      },
                      {
                        icon: Heart,
                        label: "Donor",
                        description: "Donate blood and save lives",
                        path: "/donor/dashboard",
                      },
                      {
                        icon: Users,
                        label: "Patient",
                        description: "Find blood donors near you",
                        path: "/patient/dashboard",
                      },
                      {
                        icon: Globe,
                        label: "Organisation",
                        description: "Manage blood bank inventory",
                        path: "/organisation/dashboard",
                      },
                    ].map((role) => (
                      <button
                        key={role.label}
                        onClick={() => handleNavigation(role.path)}
                        className={`flex items-center justify-between px-4 py-3 transition-all duration-300 border rounded-lg ${
                          theme === "light"
                            ? "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-red-500/50"
                            : "bg-slate-800/50 hover:bg-slate-800 border-slate-700 hover:border-primary/50"
                        } group`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              theme === "light" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                            }`}
                          >
                            <role.icon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <div
                              className={`font-semibold ${
                                theme === "light"
                                  ? "text-gray-900 group-hover:text-red-500"
                                  : "text-white group-hover:text-primary"
                              }`}
                            >
                              {role.label}
                            </div>
                            <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                              {role.description}
                            </div>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-5 h-5 transition-transform ${
                            theme === "light"
                              ? "text-gray-400 group-hover:text-red-500"
                              : "text-slate-400 group-hover:text-primary"
                          } group-hover:translate-x-1`}
                        />
                      </button>
                    ))}
                  </div>
                  <DialogFooter
                    className={`pt-4 border-t ${theme === "light" ? "border-gray-200" : "border-slate-800"}`}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`${
                          theme === "light"
                            ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        Close
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <motion.a
                href="https://docs-git-main-shardendu-mishra.vercel.app/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`gap-2 btn btn-outline btn-lg ${
                  theme === "light"
                    ? "text-gray-900 border-gray-300 hover:bg-gray-100"
                    : "text-white border-white/20 hover:bg-white/10"
                }`}
              >
                Learn More
                <ChevronDown className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -translate-x-1/2 bottom-8 left-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown className={`w-8 h-8 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
        </motion.div>
      </motion.section>

      {/* Blood Availability Section */}
      <section className={`relative py-16 overflow-hidden ${theme === "light" ? "bg-gray-50" : ""}`}>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <h2 className={`mb-4 text-3xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>
              Current Blood Availability
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
              Real-time updates of blood type availability across our network
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {[
              { type: "A+", availability: 85 },
              { type: "A-", availability: 60 },
              { type: "B+", availability: 75 },
              { type: "B-", availability: 45 },
              { type: "O+", availability: 90 },
              { type: "O-", availability: 30 },
              { type: "AB+", availability: 65 },
              { type: "AB-", availability: 40 },
            ].map((blood) => (
              <BloodTypeCard key={blood.type} {...blood} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Donor Achievements Section */}
      <section className={`relative py-24 ${theme === "light" ? "bg-gray-100" : "bg-base-200/50"}`}>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full ${
                theme === "light" ? "bg-red-500/10" : "bg-primary/10"
              }`}
            >
              <Sparkles className={`w-5 h-5 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
              <span className={`font-medium ${theme === "light" ? "text-red-500" : ""}`}>Donor Achievements</span>
            </div>
            <h2 className={`mb-4 text-4xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>
              Every Donation Counts
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
              Track your impact and earn recognition for saving lives
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Bronze Lifesaver",
                description: "Complete your first donation",
                icon: Heart,
                progress: 100,
              },
              {
                title: "Silver Guardian",
                description: "Donate 5 times in 6 months",
                icon: Shield,
                progress: 60,
              },
              {
                title: "Golden Hero",
                description: "Help save 10+ lives",
                icon: Award,
                progress: 30,
              },
            ].map((achievement) => (
              <motion.div
                key={achievement.title}
                whileHover={{ scale: 1.02 }}
                className={`p-6 border rounded-lg ${
                  theme === "light"
                    ? "bg-white shadow-sm border-gray-100"
                    : "bg-base-100/50 backdrop-blur-sm border-primary/10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${theme === "light" ? "bg-red-500/10" : "bg-primary/10"}`}>
                    <achievement.icon className={`w-6 h-6 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${theme === "light" ? "text-gray-900" : ""}`}>{achievement.title}</h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <div className={`w-full h-2 rounded-full ${theme === "light" ? "bg-gray-200" : "bg-base-300"}`}>
                  <div
                    className={`h-full rounded-full ${theme === "light" ? "bg-red-500" : "bg-primary"}`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Centers Section */}
      <section className={`relative py-24 ${theme === "light" ? "bg-gray-100" : "bg-base-200/50"}`}>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            <div>
              <h2 className={`mb-6 text-4xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>
                Find Donation Centers Near You
              </h2>
              <p className={`mb-8 text-lg ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
                Locate the nearest blood banks and hospitals in our network. View real-time requirements and book your
                donation slot instantly.
              </p>
              <div className="space-y-4">
                {[
                  { label: "City Hospital", distance: "0.8 km", urgent: true },
                  { label: "Red Cross Center", distance: "1.2 km", urgent: false },
                  { label: "Community Blood Bank", distance: "2.5 km", urgent: false },
                ].map((center) => (
                  <motion.div
                    key={center.label}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      theme === "light" ? "bg-white shadow-sm border border-gray-100" : "bg-base-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-5 h-5 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
                      <div>
                        <h3 className={`font-medium ${theme === "light" ? "text-gray-900" : ""}`}>{center.label}</h3>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
                          {center.distance} away
                        </p>
                      </div>
                    </div>
                    <button
                      className={`btn btn-sm ${
                        theme === "light" ? "bg-red-500 hover:bg-red-600 text-white" : "btn-primary"
                      }`}
                    >
                      {center.urgent ? "Urgent Need" : "Book Slot"}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            <div
              className={`relative overflow-hidden rounded-lg aspect-square ${
                theme === "light" ? "bg-gray-200" : "bg-base-200"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(220,38,38,0.1),transparent)]" />
              <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
                {/* {[...Array(400)].map((_, i) => (
                  <div
                    key={i}
                    className={`border-[0.5px] ${theme === "light" ? "border-red-500/10" : "border-primary/10"}`}
                  />
                ))} */}
                <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [78.9629, 22.5937] 
        }}
        className="w-full h-full"
      >
        <Geographies geography={INDIA_GEO_DATA}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredState === geo.properties.name;
              
              return (
                
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHovered ? "#FF8787" : "#FF6B6B"}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      fill: "#FF8787",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      outline: "none"
                    }
                  }}
                  onMouseEnter={() => {
                    setTooltipContent(geo.properties.name);
                    setHoveredState(geo.properties.name);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                    setHoveredState(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {tooltipContent && (
        <div className="absolute px-3 py-2 text-sm bg-white rounded-lg shadow-lg top-4 left-4">
          {tooltipContent}
        </div>
      )}
    </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${theme === "light" ? "bg-white" : "bg-base-200"}`}>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`mb-4 text-4xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>
              Why Choose BloodSphere?
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
              We're revolutionizing blood donation with cutting-edge technology and a passionate community
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`p-6 rounded-lg ${
                  theme === "light" ? "bg-white shadow-sm border border-gray-100" : "bg-base-100"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className={`w-12 h-12 mb-4 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
                <h3 className={`mb-2 text-xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>
                  {feature.title}
                </h3>
                <p className={theme === "light" ? "text-gray-600" : "opacity-80"}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`relative py-24 ${theme === "light" ? "bg-gray-100" : "bg-base-200/50"}`}>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`mb-4 text-4xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>How It Works</h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>
              Join our platform in three simple steps and start saving lives
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Create Account",
                description: "Sign up and complete your donor profile with relevant medical information",
              },
              {
                icon: MapPin,
                title: "Find Centers",
                description: "Locate nearby donation centers and check real-time blood requirements",
              },
              {
                icon: Calendar,
                title: "Schedule Donation",
                description: "Book your donation slot and receive reminders and preparation tips",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className={`relative p-6 text-center ${
                  theme === "light" ? "bg-white rounded-lg shadow-sm border border-gray-100" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full ${
                    theme === "light" ? "bg-red-500/10" : "bg-primary/20"
                  }`}
                >
                  <step.icon className={`w-8 h-8 ${theme === "light" ? "text-red-500" : "text-primary"}`} />
                </div>
                <h3 className={`mb-2 text-xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>{step.title}</h3>
                <p className={theme === "light" ? "text-gray-600" : "opacity-80"}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className={`py-24 ${theme === "light" ? "bg-gray-50" : "bg-base-200"}`}>
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: "10K+", label: "Active Donors" },
              { value: "30K+", label: "Lives Saved" },
              { value: "500+", label: "Partner Hospitals" },
              { value: "50+", label: "Cities Covered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`mb-2 text-4xl font-bold ${theme === "light" ? "text-red-500" : "text-primary"}`}>
                  {stat.value}
                </div>
                <div className={`text-lg ${theme === "light" ? "text-gray-600" : "opacity-80"}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={`relative ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-base-200 text-slate-200"}`}>
        <div className="container relative px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Platform Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Globe className={`w-6 h-6 ${theme === "light" ? "text-red-500" : "text-blue-500"}`} />
                <span className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>BloodSphere</span>
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
                  className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-blue-500"}`}
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
                      className={`${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-blue-500"}`}
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
                Developed by BloodSphere
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                            theme === "light" ? "text-red-500 bg-red-500/10" : "text-blue-500 bg-blue-500/10"
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
                          theme === "light" ? "text-gray-600 hover:text-red-500" : "text-slate-400 hover:text-blue-500"
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
              © {new Date().getFullYear()} BloodSphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {isDialogOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" aria-hidden="true" />}
    </div>
  )
}

export default Landing

