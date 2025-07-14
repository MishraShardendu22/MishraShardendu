class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }

// Useage

// return new ApiResponse(200, products, "Products fetched successfully");
//     {
//       "statusCode": 200,
//       "data": [...],
//       "message": "Products fetched successfully",
//       "success": true
//     }

// In Summary:
// ApiError: Standardizes how you throw errors, ensuring consistency and making debugging easier. Without it, you'll have to manage error messages, codes, and stacks manually, leading to more complex code.