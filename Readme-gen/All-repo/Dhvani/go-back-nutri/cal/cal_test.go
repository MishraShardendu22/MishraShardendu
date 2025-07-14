package cal

import (
	"testing"

	"github.com/MishraShardendu22/models"
)

func TestCalculate(t *testing.T) {
	data := models.NutritionalData{
		Energy:              1000,
		Sugars:              15,
		Fibre:               2,
		Protein:             3,
		Fruits:              45,
		Sodium:              500,
		SaturatedFattyAcids: 4,
	}

	result := Calculate(data, models.Food)

	if result.Value == 0 {
		t.Errorf("Expected non-zero score, got %d", result.Value)
	}
}
