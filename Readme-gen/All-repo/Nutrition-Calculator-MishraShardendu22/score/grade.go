package score

import "github.com/MishraShardendu22/constant"

func GetGrade(score int) string {
	switch {
	case score <= -1:
		return constant.ScoreToLetter[10] // A
	case score <= 10:
		return constant.ScoreToLetter[21] // B
	case score <= 18:
		return constant.ScoreToLetter[32] // C
	case score <= 28:
		return constant.ScoreToLetter[43] // D
	default:
		return constant.ScoreToLetter[54] // E
	}
}
