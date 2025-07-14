package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"io"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Question struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Question_Number int                `bson:"question_number" json:"question_number"`
	Difficulty     string             `bson:"difficulty" json:"difficulty"`
	Rating         int                `bson:"rating" json:"rating"`
	Question       string             `bson:"question" json:"question"`
	Answer         string             `bson:"answer" json:"answer"`
}

var collection *mongo.Collection

func SendToDataBase(collection *mongo.Collection) {
	if !IsCollectionEmpty(collection) {
		return
	}

	file, err := os.Open("routes/DragonBallAPI.json")
	HandleError(err)
	defer file.Close()

	bytes, err := io.ReadAll(io.Reader(file))
	HandleError(err)

	var questions []Question
	err = json.Unmarshal(bytes, &questions)
	HandleError(err)

	for _, question := range questions {
		_, err := collection.InsertOne(context.Background(), question)
		HandleError(err)
	}

	fmt.Println("Questions added to database")
}

func IsCollectionEmpty(collection *mongo.Collection) bool {
	count, err := collection.CountDocuments(context.Background(), bson.D{})
	HandleError(err)
	return count == 0
}

func HandleError(err error) {
	if err != nil {
		panic(err)
	}
	fmt.Println("There was no error!!")
}

// Both bson.D and bson.M work for filtering documents in MongoDB, but they serve slightly different purposes:

// bson.D is an ordered representation, which stores the filter as a slice of key-value pairs. It’s preferred when the order of fields matters, which can sometimes be important, especially for complex queries and MongoDB commands that care about field order.

// bson.M is an unordered representation, using a map of key-value pairs. It's great for most simple cases where the order of fields doesn’t matter, and it often results in slightly shorter code.

// For counting all documents, either bson.D{} or bson.M{} will work equally well because the order of fields doesn’t matter in an empty filter. So if you’d like, you could replace bson.D{} with bson.M{}:

// go
// Copy code
// count, err := collection.CountDocuments(context.Background(), bson.M{})
// Both are valid, but bson.D is often used in MongoDB documentation for consistency, as it’s more flexible for complex queries.
