// Axios Instance: apiClient.js
import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3000", // Base URL for API calls
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // Enable cookies
});

export default apiClient;
