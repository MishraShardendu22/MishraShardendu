package util

import (
	"github.com/gofiber/fiber/v2"
)

func Testfunc(c *fiber.Ctx) error {
	// doc := &models.TestModel{Name: "Shardendu", Msg: "MGM works"}
	// if err := mgm.Coll(doc).Create(doc); err != nil {
	// 	log.Fatal("Create failed:", err)
	// }

	// result := &models.TestModel{}
	// if err := mgm.Coll(result).FindByID(doc.ID.Hex(), result); err != nil {
	// 	log.Fatal("Find failed:", err)
	// }

	// fmt.Println("Fetched:", result.Name, "-", result.Msg)
	return ResponseAPI(c, fiber.StatusOK, "Test endpoint", nil, "")
}
