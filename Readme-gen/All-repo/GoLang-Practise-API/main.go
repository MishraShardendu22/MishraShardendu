package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

var courses []Course // Declare the courses slice globally

// Main function to initialize the API
func main() {
	fmt.Println("API - Shardendu Mishra")
	r := mux.NewRouter()

	// Initialize the courses slice with sample data
	courses = append(
		courses,
		Course{
			CourseId:    "1",
			CourseName:  "PERN Stack",
			CoursePrice: 499,
			Author: &Author{
				Fullname: "Shardendu Mishra 2",
				Website:  "shardendumishra01@gmail.com",
			},
		},
	)

	courses = append(
		courses,
		Course{
			CourseId:    "2",
			CourseName:  "MERN Stack",
			CoursePrice: 899,
			Author: &Author{
				Fullname: "Shardendu Mishra 4",
				Website:  "shardendumishra02@gmail.com",
			},
		},
	)

	// Get The Server Up and Running on PORT 4000
	r.HandleFunc("/", serveHome).Methods("GET")

	// Get All Courses
	r.HandleFunc("/courses", getAllCourses).Methods("GET")

	// Get Courses by ID
	r.HandleFunc("/course/{id}", getOneCourse).Methods("GET")

	// Create
	r.HandleFunc("/course", createOneCourse).Methods("POST")

	// update a course
	r.HandleFunc("/course/{id}", updateOneCourse).Methods("PUT")

	// Delete a course
	r.HandleFunc("/course/{id}", deleteOneCourse).Methods("DELETE")

	// Add a PATCH route for partially updating a course
	r.HandleFunc("/course/{id}", patchOneCourse).Methods("PATCH")

	// Start the server on port 4000
	log.Fatal(http.ListenAndServe(":4000", r))
	fmt.Println("Server is running on port http://localhost:4000")
}

// Course struct
type Course struct {
	CourseId    string  `json:"courseid"`
	CourseName  string  `json:"coursename"`
	CoursePrice int     `json:"price"`
	Author      *Author `json:"author"`
}

// Author struct
type Author struct {
	Fullname string `json:"fullname"`
	Website  string `json:"website"`
}

// Function to check if the course is empty and its part of a structure
func (c *Course) IsEmpty() bool {
	return c.CourseName == ""
}

// Home route
func serveHome(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Home route")
	w.Write([]byte("<h1>Shardendu Mishra</h1>"))
}

// Get All Courses
// r.HandleFunc("/courses", getAllCourses).Methods("GET")

func getAllCourses(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get all courses")
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(courses)
}

// Get a course by ID
// r.HandleFunc("/course/{id}",getOneCourse).Methods("GET")

func getOneCourse(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get one course")
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for _, course := range courses {
		if course.CourseId == params["id"] {
			json.NewEncoder(w).Encode(course)
			return
		}
	}
	json.NewEncoder(w).Encode("No course found with the given ID")
}

// Create a new course
// r.HandleFunc("/course", createOneCourse).Methods("POST")

func createOneCourse(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Create one course")
	w.Header().Set("Content-Type", "application/json")

	// body is empty
	if r.Body == nil {
		json.NewEncoder(w).Encode("Please send some data")
		return
	}

	var course Course
	err := json.NewDecoder(r.Body).Decode(&course)

	// there is a body but nothing insde the body
	if course.IsEmpty() {
		json.NewEncoder(w).Encode("No data inside JSON")
		return
	}

	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	rand.Seed(time.Now().UnixNano())
	course.CourseId = strconv.Itoa(rand.Intn(100)) // Generate a random ID
	courses = append(courses, course)              // Add course to the slice
	json.NewEncoder(w).Encode(course)              // Return the created course
}

// update a course
// r.HandleFunc("/course/{id}", updateOneCourse).Methods("PUT")

func updateOneCourse(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Update one course")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	for index, course := range courses {
		if course.CourseId == params["id"] {
			courses = append(courses[:index], courses[index+1:]...) // Remove the existing course

			var updatedCourse Course
			err := json.NewDecoder(r.Body).Decode(&updatedCourse)
			if err != nil {
				http.Error(w, "Invalid request payload", http.StatusBadRequest)
				return
			}

			updatedCourse.CourseId = params["id"] // Set the ID of the updated course
			courses = append(courses, updatedCourse)
			json.NewEncoder(w).Encode(updatedCourse) // Return the updated course
			return
		}
	}

	json.NewEncoder(w).Encode("No course found with the given ID")
}

// Delete a course
// r.HandleFunc("/course/{id}", deleteOneCourse).Methods("DELETE")

func deleteOneCourse(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Delete one course")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	for index, course := range courses {
		if course.CourseId == params["id"] {
			courses = append(courses[:index], courses[index+1:]...)
			json.NewEncoder(w).Encode("Course deleted successfully")
			return
		}
	}
	json.NewEncoder(w).Encode("No course found with the given ID")
}

// Add a PATCH route for partially updating a course
// r.HandleFunc("/course/{id}", patchOneCourse).Methods("PATCH")

func patchOneCourse(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Patch one course")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	for index, course := range courses {
		if course.CourseId == params["id"] {
			var updatedFields map[string]interface{} // Using map for partial updates
			err := json.NewDecoder(r.Body).Decode(&updatedFields)
			if err != nil {
				http.Error(w, "Invalid request payload", http.StatusBadRequest)
				return
			}

			// Update only the fields provided in the request
			if name, ok := updatedFields["coursename"]; ok {
				course.CourseName = name.(string)
			}
			if price, ok := updatedFields["price"]; ok {
				course.CoursePrice = int(price.(float64)) // Convert to int
			}
			if author, ok := updatedFields["author"]; ok {
				var authorData Author
				authorBytes, _ := json.Marshal(author)
				json.Unmarshal(authorBytes, &authorData) // Decode author details
				course.Author = &authorData
			}

			courses[index] = course           // Update the course in the slice
			json.NewEncoder(w).Encode(course) // Return the updated course
			return
		}
	}

	json.NewEncoder(w).Encode("No course found with the given ID")
}
