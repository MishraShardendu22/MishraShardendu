package cal

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/score"
)

func Calculate(data models.NutritionalData, st models.ScoreType) models.NutritionalScore {
	energy := score.Energy(data.Energy).GetPoints(st)
	sugar := score.Sugar(data.Sugars).GetPoints(st)
	sfa := score.SaturatedFattyAcids(data.SaturatedFattyAcids).GetPoints(st)
	sodium := score.Sodium(data.Sodium).GetPoints(st)

	fruits := score.Fruits(data.Fruits).GetPoints(st)
	fibre := score.Fibre(data.Fibre).GetPoints(st)
	protein := score.Protein(data.Protein).GetPoints(st)

	negative := energy + sugar + sfa + sodium
	positive := fruits + fibre + protein

	final := negative - positive

	return models.NutritionalScore{
		Value:     final,
		Positive:  positive,
		Negative:  negative,
		ScoreType: st,
	}
}
