/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const GO_BACK = import.meta.env.VITE_GO_BACK as string

const healthIssuesList = [
  "cancer",
  "heart_disease",
  "diabetes",
  "hypertension",
  "asthma",
  "stroke",
  "epilepsy",
  "HIV",
  "hepatitis",
  "tuberculosis",
  "malaria",
  "chronic_kidney_disease",
  "autoimmune_disorders",
  "blood_clotting_disorders",
  "mental_illness",
  "pregnancy",
  "severe_allergies",
  "liver_disease",
  "recent_infections",
  "drug_abuse"
]

const PatientSurvey = () => {
  const navigate = useNavigate()
  const [symptomsIllness, setSymptomsIllness] = useState('')
  const [recentMedicalProcedures, setRecentMedicalProcedures] = useState('')
  const [travelHistory, setTravelHistory] = useState('')
  const [medicalConditions, setMedicalConditions] = useState('')
  const [highRiskExposure, setHighRiskExposure] = useState('')
  const [otherIssues, setOtherIssues] = useState<string[]>([])

  const handleCheckbox = (e: any) => {
    if (e.target.checked) {
      setOtherIssues([...otherIssues, e.target.value])
    } else {
      setOtherIssues(otherIssues.filter(issue => issue !== e.target.value))
    }
  }

  const giveSurvey = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post(GO_BACK + "/patient/postPatientSurvey", {
        symptoms_illness: symptomsIllness,
        recent_medical_procedures: recentMedicalProcedures,
        travel_history: travelHistory,
        medical_conditions: medicalConditions,
        high_risk_exposure: highRiskExposure,
        other_issues: otherIssues
      })

      // Fix This 
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={giveSurvey}>
        <input type="text" placeholder="Symptoms & Illness" value={symptomsIllness} onChange={e => setSymptomsIllness(e.target.value)} />
        <input type="text" placeholder="Recent Medical Procedures" value={recentMedicalProcedures} onChange={e => setRecentMedicalProcedures(e.target.value)} />
        <input type="text" placeholder="Travel History" value={travelHistory} onChange={e => setTravelHistory(e.target.value)} />
        <input type="text" placeholder="Medical Conditions" value={medicalConditions} onChange={e => setMedicalConditions(e.target.value)} />
        <input type="text" placeholder="High Risk Exposure" value={highRiskExposure} onChange={e => setHighRiskExposure(e.target.value)} />
        <div>
          {healthIssuesList.map(issue => (
            <label key={issue}>
              <input type="checkbox" value={issue} onChange={handleCheckbox} checked={otherIssues.includes(issue)} />
              {issue}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PatientSurvey