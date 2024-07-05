class APIError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack; // stack provides path to the full error, where it originated, etc.
        } else {
            Error.captureStackTrace(this, this.constructor); // to start tracing the error from here {Creates the `stack` property}
        }
    }
}
