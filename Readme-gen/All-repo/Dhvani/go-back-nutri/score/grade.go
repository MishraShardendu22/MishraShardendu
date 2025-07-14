package score

import "github.com/MishraShardendu22/constant"

func GetGrade(score int) string {
	switch {
	case score <= -1:
		return constant.ScoreToLetter[0] // A
	case score <= 2:
		return constant.ScoreToLetter[1] // B
	case score <= 10:
		return constant.ScoreToLetter[2] // C
	case score <= 18:
		return constant.ScoreToLetter[3] // D
	default:
		return constant.ScoreToLetter[4] // E
	}
}
