# Nutritional Scoring API

## Overview

This service provides an API to calculate the nutritional score of food or beverage items based on their nutrient values. It uses Nutri-Score logic to return a health grade (A to E) based on standard thresholds.

---

## Technologies Used

- **Go (Golang)** – Core backend
- **Fiber** – Fast HTTP web framework
- **CORS Middleware** – Cross-origin support
- **Modular structure** – Clean separation of models, scoring logic, constants, utilities

---

## API Endpoints

### `GET /test123`

**Purpose**: Health check route  
**Response**:
```json
{
  "status": 200,
  "message": "Application is Working",
  "data": null
}
````

---

### `POST /calculate-nutrition`

**Purpose**: Calculate nutritional score based on input data

**Request Body**:

```json
{
  "Energy": 1500,
  "Sugars": 20,
  "Fibre": 3,
  "Protein": 4,
  "Fruits": 50,
  "Sodium": 500,
  "SaturatedFattyAcids": 4,
  "IsWater": false
}
```

**Note**: All fields must be non-zero (except `IsWater`, which is optional).

**Response**:

```json
{
  "status": 202,
  "message": "Nutrition score calculated successfully",
  "data": "C"
}
```

**Status Codes**:

* `202`: Accepted and processed
* `400`: Invalid or incomplete request

---

## Folder Structure

```
.
├── main.go                  // Entry point
├── models/                 // Core types and data structures
├── constant/               // Nutrient scoring thresholds
├── util/                   // Utility functions (e.g., unit conversion, response wrapper)
├── score/                  // Point logic for each nutrient
├── cal/                    // Total score calculation logic
```

---

## Usage

Run the app:

```bash
go run main.go
```

API runs at: `http://localhost:3000`

---

## Deployment Notes

This service is intended to be packaged as a **plug-and-play reusable component**, for example:

* As a backend API microservice
* As part of a larger health/food analysis platform
* Published as a Go module or npm wrapper (for serverless triggers)

You can embed this scoring logic into any parent application as a portable scoring backend.

---
