import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT, // Replace with your API's base URL
  timeout: 20000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Append query parameters
    if (!config.params) {
      config.params = {};
    }

    // Modify the request URL (e.g., add a prefix for API versioning)
    config.url = `/${config.url}`;
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const message = response.data?.message;
    if (message) {
    }
    return response.data;
  },
  (error) => {
    if (!error.config._toastShown) {
      error.config._toastShown = true; // Mark toast as shown
      // Handle errors globally
      if (error.response) {
        const { status, data } = error.response;
        const message = data?.message || "An error occurred!";
        const error_type = data?.type || "error";
        if (status === 401) {
          localStorage.clear();
          window.location.href = "/sign-in";
        }
        if (error_type.type === "unauthorized") {
          localStorage.clear();
          window.location.href = "/sign-in";
        } else if (error_type === "validation") {
          const validationError = message;
          if (validationError && Object.keys(validationError).length > 0) {
            const firstErrorKey = Object.keys(validationError)[0];
            const firstErrorMessage = validationError[firstErrorKey][0];
            MySwal.fire({
              //title: `Error ${status}`,
              text: firstErrorMessage,
              icon: "warning",
              showCloseButton: true,
              showConfirmButton: false,
              showCancelButton: false,
            });
          } else {
            MySwal.fire({
              //title: `Error ${status}`,
              text: message,
              icon: "warning",
              showCloseButton: true,
              showConfirmButton: false,
              showCancelButton: false,
            });
          }
        } else {
          MySwal.fire({
            //title: `Error ${status}`,
            text: message,
            icon: "warning",
            showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
          });
        }
      } else if (error.request) {
        // Request was made but no response was received
        MySwal.fire({
          text: "No response from the server. Please try again.",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: false,
          showCancelButton: false,
        });
      } else {
        // Other errors (e.g., setting up request)
        MySwal.fire({
          text: "An unexpected error occurred.",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
