package util

import "github.com/MishraShardendu22/models"

func EnergyFromKcal(kcal float64) models.EnergyKJ {
	return models.EnergyKJ(kcal * 4.184)
}

func SodiumFromSalt(saltMg float64) models.SodiumMilligram {
	return models.SodiumMilligram(saltMg / 2.5)
}

func GetPointsFromRange(v float64, steps []float64) int {
	lenSteps := len(steps)
	for i, l := range steps {
		if v > l {
			return lenSteps - i
		}
	}
	return 0
}
