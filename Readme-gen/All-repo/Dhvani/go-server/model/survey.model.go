package model

import "go.mongodb.org/mongo-driver/bson/primitive"

// Define the possible values for health issues
type HealthIssue string

const (
	Cancer                 HealthIssue = "cancer"
	HeartDisease           HealthIssue = "heart_disease"
	Diabetes               HealthIssue = "diabetes"
	Hypertension           HealthIssue = "hypertension"
	Asthma                 HealthIssue = "asthma"
	Stroke                 HealthIssue = "stroke"
	Epilepsy               HealthIssue = "epilepsy"
	HIV                    HealthIssue = "HIV"
	Hepatitis              HealthIssue = "hepatitis"
	Tuberculosis           HealthIssue = "tuberculosis"
	Malaria                HealthIssue = "malaria"
	ChronicKidneyDisease   HealthIssue = "chronic_kidney_disease"
	AutoimmuneDisorders    HealthIssue = "autoimmune_disorders"
	BloodClottingDisorders HealthIssue = "blood_clotting_disorders"
	MentalIllness          HealthIssue = "mental_illness"
	Pregnancy              HealthIssue = "pregnancy"
	SevereAllergies        HealthIssue = "severe_allergies"
	LiverDisease           HealthIssue = "liver_disease"
	RecentInfections       HealthIssue = "recent_infections"
	DrugAbuse              HealthIssue = "drug_abuse"
)

type Survey struct {
	DonorID                 primitive.ObjectID `json:"donor_id"`
	SymptomsIllness         string             `json:"symptoms_illness"`          
	RecentMedicalProcedures string             `json:"recent_medical_procedures"` 
	TravelHistory           string             `json:"travel_history"`            
	MedicalConditions       string             `json:"medical_conditions"`        
	HighRiskExposure        string             `json:"high_risk_exposure"`        
	OtherIssues             []HealthIssue      `json:"other_issues"`              
}
