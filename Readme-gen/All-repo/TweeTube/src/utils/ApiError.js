class ApiError extends Error {
  constructor(
      statusCode,
      message= "Something went wrong",
      errors = [],
      stack = ""
  ){
      super(message)
      this.statusCode = statusCode
      this.data = null
      this.message = message
      this.success = false;
      this.errors = errors

      if (stack) {
          this.stack = stack
      } else{
          Error.captureStackTrace(this, this.constructor)
      }

  }
}

export { ApiError }

// Usage example
// throw new ApiError(400, "Payment failed", ["Insufficient funds"]);

// Expected response
// {
//   "success": false,
//   "message": "Payment failed",
//   "errors": ["Insufficient funds"],
//   "statusCode": 400
// }
