package models

type ScoreType int

const (
	Food ScoreType = iota
	Water
	Cheese
	Beverage
)

type NutritionalScore struct {
	Value     int
	Positive  int
	Negative  int
	ScoreType ScoreType
}

type EnergyKJ float64
type SugarGram float64
type FibreGram float64
type ProteinGram float64
type FruitsPercent float64
type SodiumMilligram float64
type SaturatedFattyAcidsGram float64

type NutritionalData struct {
	IsWater             bool
	Energy              EnergyKJ
	Sugars              SugarGram
	Fibre               FibreGram
	Protein             ProteinGram
	Fruits              FruitsPercent
	Sodium              SodiumMilligram
	SaturatedFattyAcids SaturatedFattyAcidsGram
}
