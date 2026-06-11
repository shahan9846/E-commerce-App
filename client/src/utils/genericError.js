export const genericError = (error) => {
    // If the error comes from an API response
    if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;

        if (status === 400) {
            return serverMessage || "Bad request. Please check your input.";
        } else if (status === 401) {
            return serverMessage || "Unauthorized access. Please log in again.";
        } else if (status === 403) {
            return serverMessage || "Forbidden. You do not have permission to perform this action.";
        } else if (status === 404) {
            return serverMessage || "Resource not found.";
        } else if (status === 500) {
            return "Internal server error. Please try again later.";
        } else {
            return serverMessage || "An unexpected error occurred.";
        }
    } 
    // If the request was made but no response was received (network error)
    else if (error.request) {
        return "Network error. Please check your internet connection and try again.";
    } 
    // If something else caused the error
    else {
        return error.message || "An error occurred.";
    }
};