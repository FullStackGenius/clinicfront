import axios from "axios";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const axiosInstance = axios.create({
	//baseURL: "https://api.example.com", // Replace with your API's base URL
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

		// Add a custom header
		//config.headers["X-Custom-Header"] = "MyCustomHeaderValue";

		// Append query parameters
		if (!config.params) {
		  config.params = {};
		}
		//config.params.timestamp = Date.now();

		// Modify the request URL (e.g., add a prefix for API versioning)
		config.url = `/${config.url}`;

		// Modify request data (for POST/PUT requests)
		/*if (config.method === "post" || config.method === "put") {
			config.data = { ...config.data,  additionalField: "extraValue" };
		}*/
		//console.log("Updated Request Config:", config);
		//console.log('config', config)
		return config;
	},
	(error) => {
		// Handle request errors
		console.error("Request Error:", error);
		return Promise.reject(error);
	}
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		// Transform or log response if needed
		//console.log('response.data', response.data)
		//show message if available
		const message = response.data?.message;
		if(message){
			//toast.success(`Success : ${message}`, { duration: 9000, style: { minWidth: '250px' } });
		}
		return response.data;
	},
	(error) => {
		//console.log('error', error)
		if (!error.config._toastShown) {
			error.config._toastShown = true; // Mark toast as shown
			// Handle errors globally
			if (error.response) {
				// Server responded with a status other than 2xx
				const { status, data } = error.response;
				const message = data?.message || "An error occurred!";
				const error_type = data?.type || "error";
				if(status === 401){
					localStorage.clear();
					window.location.href = '/sign-in';
				} 
				//toast.error(`Error ${status}: ${message}`, { duration: 9000, style: { minWidth: '250px' } });
				if(error_type.type === 'unauthorized'){
					localStorage.clear();
					window.location.href = '/sign-in';
				} else if (error_type === "validation") {
					const validationError = message;
					if (validationError && Object.keys(validationError).length > 0) {
						const firstErrorKey = Object.keys(validationError)[0];
						const firstErrorMessage = validationError[firstErrorKey][0];
						//addError(firstErrorMessage, 'error');
						//toast.error(`Error ${status}: ${firstErrorMessage}`, { duration: 9000, style: { minWidth: '250px' } });
						MySwal.fire({
							title: `Error ${status}`,
							text: firstErrorMessage,
							icon: 'warning',
							showCloseButton: true,
							showConfirmButton: false,
							showCancelButton: false
						});
					} else {
						//toast.error(`Error ${status}: ${message}`, { duration: 9000, style: { minWidth: '250px' } });
						MySwal.fire({
							title: `Error ${status}`,
							text: message,
							icon: 'warning',
							showCloseButton: true,
							showConfirmButton: false,
							showCancelButton: false
						});
					}
					//addError(res.message, 'error')
				} else {
					//toast.error(`Error ${status}: ${message}`, { duration: 9000, style: { minWidth: '250px' } });
					MySwal.fire({
						title: `Error ${status}`,
						text: message,
						icon: 'warning',
						showCloseButton: true,
						showConfirmButton: false,
						showCancelButton: false
					});
				}
			} else if (error.request) {
				// Request was made but no response was received
				//toast.error("No response from the server. Please try again.", { duration: 9000, style: { minWidth: '250px' } });
				MySwal.fire({
					text: "No response from the server. Please try again.",
					icon: 'warning',
					showCloseButton: true,
					showConfirmButton: false,
					showCancelButton: false
				});
			} else {
				// Other errors (e.g., setting up request)
				//toast.error("An unexpected error occurred.", { duration: 9000, style: { minWidth: '250px' } });
				MySwal.fire({
					text: "An unexpected error occurred.",
					icon: 'warning',
					showCloseButton: true,
					showConfirmButton: false,
					showCancelButton: false
				});
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
