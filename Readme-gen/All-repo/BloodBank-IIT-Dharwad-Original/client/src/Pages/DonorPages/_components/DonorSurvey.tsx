import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

const healthIssuesList = [
  "Cancer",
  "Heart Disease",
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Stroke",
  "Epilepsy",
  "HIV",
  "Hepatitis",
  "Tuberculosis",
  "Malaria",
  "Chronic Kidney Disease",
  "Autoimmune Disorders",
  "Blood Clotting Disorders",
  "Mental Illness",
  "Pregnancy",
  "Severe Allergies",
  "Liver Disease",
  "Recent Infections",
  "Drug Abuse",
]

const DonorSurvey = () => {
  const navigate = useNavigate()
  const { theme } = useThemeStore()
  const [formData, setFormData] = useState({
    symptomsIllness: "",
    recentMedicalProcedures: "",
    travelHistory: "",
    medicalConditions: "",
    highRiskExposure: "",
    otherIssues: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (issue: string) => {
    setFormData((prev) => ({
      ...prev,
      otherIssues: prev.otherIssues.includes(issue)
        ? prev.otherIssues.filter((i) => i !== issue)
        : [...prev.otherIssues, issue],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axiosInstance.post("/donor/postDonorSurvey", formData)
      toast.success("Survey Submitted, Thank you for completing the donor survey.")
      navigate("/")
    } catch (error) {
      console.error("Error submitting survey:", error)
      toast.error("There was an error submitting your survey. Please try again.")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className={theme === "light" ? "bg-white" : "bg-gray-800"}>
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
            Donor Health Survey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="symptomsIllness">Current Symptoms or Illnesses</Label>
              <Textarea
                id="symptomsIllness"
                name="symptomsIllness"
                value={formData.symptomsIllness}
                onChange={handleInputChange}
                placeholder="Describe any current symptoms or illnesses"
                className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-gray-700"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recentMedicalProcedures">Recent Medical Procedures</Label>
              <Textarea
                id="recentMedicalProcedures"
                name="recentMedicalProcedures"
                value={formData.recentMedicalProcedures}
                onChange={handleInputChange}
                placeholder="List any recent medical procedures"
                className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-gray-700"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelHistory">Recent Travel History</Label>
              <Input
                id="travelHistory"
                name="travelHistory"
                value={formData.travelHistory}
                onChange={handleInputChange}
                placeholder="Enter recent travel history"
                className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-gray-700"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Existing Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                placeholder="List any existing medical conditions"
                className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-gray-700"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highRiskExposure">High Risk Exposure</Label>
              <Input
                id="highRiskExposure"
                name="highRiskExposure"
                value={formData.highRiskExposure}
                onChange={handleInputChange}
                placeholder="Describe any high risk exposures"
                className={theme === "light" ? "bg-gray-50 text-gray-600" : "bg-gray-700"}
              />
            </div>

            <div className="space-y-2">
              <Label>Other Health Issues</Label>
              <div className="grid grid-cols-2 gap-2">
                {healthIssuesList.map((issue) => (
                  <div key={issue} className="flex items-center space-x-2">
                    <Checkbox
                      id={issue}
                      checked={formData.otherIssues.includes(issue)}
                      onCheckedChange={() => handleCheckboxChange(issue)}
                    />
                    <label
                      htmlFor={issue}
                      className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                    >
                      {issue}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Survey
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DonorSurvey

