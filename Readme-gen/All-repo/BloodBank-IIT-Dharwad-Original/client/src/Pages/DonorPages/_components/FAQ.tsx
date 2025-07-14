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
        title: "Pre-donation",
        items: [
        {
            question: "What medications affect my ability to donate?",
            answer: "Most common medications are acceptable. However, blood thinners, antibiotics, and certain acne medications may require waiting periods. Always inform the screening staff about your medications."
        },
        {
            question: "Can I donate if I have recently traveled?",
            answer: "Travel to certain regions may require a waiting period due to potential exposure to diseases like malaria. Provide your travel history during screening for evaluation."
        },
        {
            question: "What should I do the night before donation?",
            answer: "Get adequate sleep (6-8 hours), avoid alcohol, drink extra fluids, and eat a healthy meal. Avoid fatty foods as they can affect blood testing."
        },
        {
            question: "Will donating blood make me weak?",
            answer: "Most donors return to normal activities immediately. Your body replaces fluid within 24 hours and red blood cells within a few weeks. Regular hydration and iron-rich foods help quick recovery."
        }
        ]
    },
    {
        title: "Post-donation",
        items: [
        {
            question: "What activities should I avoid after donating?",
            answer: "Avoid heavy lifting, strenuous exercise, and smoking for 2-3 hours. Don't operate heavy machinery for 24 hours if you feel lightheaded."
        },
        {
            question: "How can I recover faster after donation?",
            answer: "Drink extra fluids for 48 hours, keep the bandage on for 4-5 hours, avoid hot showers for 2 hours, and eat iron-rich foods like spinach, red meat, and beans."
        }
        ]
    },
    {
        title: "Special Donations",
        items: [
        {
            question: "What's the difference between whole blood and platelet donation?",
            answer: "Whole blood donation takes about 10 minutes and can be done every 12 weeks. Platelet donation takes about 2 hours but can be done every 7 days. Platelets are especially needed for cancer patients."
        },
        {
            question: "Can I donate specific blood components?",
            answer: "Yes, through apheresis you can donate specific components like platelets, plasma, or red cells. This process takes longer but allows more frequent donations."
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
                Frequently Asked Questions
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
            {filteredData.length === 0 && (
                <div className={`text-center py-8 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                No questions found matching your search. Try different keywords.
                </div>
            )}
            </CardContent>
        </Card>
        </motion.div>
    )
}

export default FAQ