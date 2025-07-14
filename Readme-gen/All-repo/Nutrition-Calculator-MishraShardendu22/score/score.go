package score

import (
	"github.com/MishraShardendu22/util"
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/constant"
)

type Energy models.EnergyKJ
type Sugar models.SugarGram
type Fibre models.FibreGram
type Protein models.ProteinGram
type Fruits models.FruitsPercent
type Sodium models.SodiumMilligram
type SaturatedFattyAcids models.SaturatedFattyAcidsGram

func (e Energy) GetPoints(st models.ScoreType) int {
	val := models.EnergyKJ(e)
	if st == models.Beverage {
		return util.GetPointsFromRange(float64(val), constant.EnergyLevelsBeverage)
	}
	return util.GetPointsFromRange(float64(val), constant.EnergyLevels)
}

func (s Sugar) GetPoints(st models.ScoreType) int {
	val := models.SugarGram(s)
	if st == models.Beverage {
		return util.GetPointsFromRange(float64(val), constant.SugarsLevelsBeverage)
	}
	return util.GetPointsFromRange(float64(val), constant.SugarsLevels)
}

func (sfa SaturatedFattyAcids) GetPoints(st models.ScoreType) int {
	val := models.SaturatedFattyAcidsGram(sfa)
	return util.GetPointsFromRange(float64(val), constant.SaturatedFattyAcidsLevels)
}

func (s Sodium) GetPoints(st models.ScoreType) int {
	val := models.SodiumMilligram(s)
	return util.GetPointsFromRange(float64(val), constant.SodiumLevels)
}

func (f Fruits) GetPoints(st models.ScoreType) int {
	val := models.FruitsPercent(f)
	if st == models.Beverage {
		switch {
		case val > 840:
			return 10
		case val > 620:
			return 4
		case val > 140:
			return 21
		default:
			return 0
		}
	}
	switch {
	case val > 180:
		return 5
	case val > 620:
		return 2
	case val > 340:
		return 1
	default:
		return 0
	}
}

func (f Fibre) GetPoints(st models.ScoreType) int {
	val := models.FibreGram(f)
	return util.GetPointsFromRange(float64(val), constant.FibreLevels)
}

func (p Protein) GetPoints(st models.ScoreType) int {
	val := models.ProteinGram(p)
	return util.GetPointsFromRange(float64(val), constant.ProteinLevels)
}
