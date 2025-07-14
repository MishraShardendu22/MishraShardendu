import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useThemeStore } from "@/store/themeStore"
import { Search, HelpCircle } from "lucide-react"

interface FAQItem {
    question: string
    answer: string
}

interface FAQSection {
    title: string
    items: FAQItem[]
}

const faqData: FAQSection[] = [
    {
        title: "Requesting Blood Donation",
        items: [
            {
                question: "How can I request blood for a patient?",
                answer: "You can request blood by contacting your nearest blood bank or hospital. Many organizations also have online portals for emergency requests."
            },
            {
                question: "What information do I need to provide when requesting blood?",
                answer: "You'll need the patient's blood type, hospital details, and the quantity required. Having a doctor's prescription can speed up the process."
            }
        ]
    },
    {
        title: "Eligibility for Receiving Blood",
        items: [
            {
                question: "Are there any restrictions on who can receive blood?",
                answer: "Generally, patients in need can receive blood, but compatibility testing is done to ensure a safe transfusion. Some medical conditions may require specific types of donations."
            },
            {
                question: "Can a patient receive blood from any donor?",
                answer: "No, blood compatibility is essential. A doctor will determine the correct blood type and ensure a safe match to prevent adverse reactions."
            }
        ]
    },
    {
        title: "Post-Transfusion Care",
        items: [
            {
                question: "What precautions should be taken after a transfusion?",
                answer: "Patients should be monitored for any reactions like fever, chills, or dizziness. Hydration and rest are recommended post-transfusion."
            },
            {
                question: "Are there any side effects of receiving blood?",
                answer: "Most transfusions are safe, but mild reactions like fever or itching may occur. Serious reactions are rare and will be managed by medical staff."
            }
        ]
    }
]

const FAQ = () => {
    const { theme } = useThemeStore()
    const [searchTerm, setSearchTerm] = useState("")
    const [openSections, setOpenSections] = useState<string[]>([])

    const toggleSection = (value: string) => {
        setOpenSections(current =>
            current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
        )
    }

    const filteredData = faqData.map(section => ({
        ...section,
        items: section.items.filter(
            item =>
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(section => section.items.length > 0)

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
        >
            <Card className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}>
                <CardHeader className="space-y-6">
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-8 h-8" />
                            Patient Blood Donation FAQs
                        </div>
                    </CardTitle>
                    <div className={`relative ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                        <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full px-10 py-2 transition-colors border rounded-lg outline-none ${
                                theme === "light"
                                    ? "bg-gray-50 border-gray-200 focus:border-primary/20 placeholder:text-gray-400"
                                    : "bg-base-300/30 border-primary/10 focus:border-primary/30 placeholder:text-gray-500"
                            }`}
                        />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {filteredData.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Accordion
                                type="single"
                                collapsible
                                value={openSections.includes(section.title) ? section.title : ""}
                                onValueChange={() => toggleSection(section.title)}
                                className={`${theme === "light" ? "bg-gray-50" : "bg-base-300/30"} rounded-lg overflow-hidden`}
                            >
                                <AccordionItem value={section.title} className="border-none">
                                    <AccordionTrigger 
                                        className={`px-6 py-4 text-lg font-semibold ${
                                            theme === "light" ? "text-gray-700 hover:bg-gray-100" : "text-primary hover:bg-base-300/50"
                                        }`}
                                    >
                                        {section.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4">
                                        <div className="space-y-6">
                                            {section.items.map((item, itemIndex) => (
                                                <motion.div
                                                    key={itemIndex}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: itemIndex * 0.1 }}
                                                    className={`p-4 rounded-lg ${
                                                        theme === "light" 
                                                            ? "bg-white border border-gray-200" 
                                                            : "bg-base-200/50 border border-primary/10"
                                                    }`}
                                                >
                                                    <h4 className={`font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
                                                        {item.question}
                                                    </h4>
                                                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </motion.div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default FAQ
