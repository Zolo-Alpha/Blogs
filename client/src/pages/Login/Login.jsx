import React, { useState, useEffect } from "react";
import apiClient from "../../helper/apiClient"; // Use the axios instance
import { useAuth } from "./useAuth"; // Custom hook for authentication state
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UnifiedLoginSignup = ({ onClose }) => {
	const navigate = useNavigate();
	const { isLoggedIn, setLoggedIn } = useAuth(); // Using the custom hook
	const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		password: "",
		newsletterIsSubscribed: false,
	});
	const [error, setError] = useState(null);

	const toggleForm = () => {
		setIsLogin(!isLogin);
		setFormData({
			email: "",
			name: "",
			password: "",
			newsletterIsSubscribed: false,
		});
		setError(null);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const endpoint = isLogin ? "/auth/login" : "/auth/signup";
			const response = await apiClient.post(endpoint, formData);
			console.log("Success:", response.data);
			setLoggedIn(true); // Update authentication state
			onClose();
		} catch (err) {
			console.error("Error:", err.response?.data || err.message);
			setError(err.response?.data?.message || "Something went wrong.");
		}
	};

	
	const handleGoogleAuth = async () => {
		try {
			// Step 1: Redirect to the Google OAuth login page
			window.location.href = `${apiClient.defaults.baseURL}/auth/google`;
			console.log("Redirecting to Google Auth...");
	
			// Step 2: After successful login, handle the callback
			// This part is executed only after the user is redirected back to your application
			const response = await apiClient.get("/auth/google/callback", { withCredentials: true });
	
			const data = await response.json();
			if (data.token) {
				console.log("Authentication successful:", data);
				
				// Store the token locally for future API requests
				localStorage.setItem("authToken", data.token);
	
				// Redirect to the target page
				window.location.href = `http://localhost:5173`;
			} else {
				console.error("Authentication failed:", data.message);
				setError("Failed to handle Google Authentication.");
			}
		} catch (err) {
			console.error("Google Auth Error:", err.message);
			setError("Failed to handle Google Authentication.");
		}
	};
	

	

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
					onClick={onClose}
				>
					<AiFillCloseCircle />
				</button>
				<h2 className="text-xl font-semibold text-center mb-4">
					{isLogin ? "Login" : "Signup"}
				</h2>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{!isLogin && (
						<input
							type="text"
							name="name"
							placeholder="Name"
							value={formData.name}
							onChange={handleChange}
							className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					)}
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{!isLogin && (
						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								name="newsletterIsSubscribed"
								checked={formData.newsletterIsSubscribed}
								onChange={handleChange}
								className="rounded focus:ring-2 focus:ring-blue-500"
							/>
							<span>Subscribe to Newsletter</span>
						</label>
					)}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
					>
						{isLogin ? "Login" : "Signup"}
					</button>
				</form>
				<button
					className="w-full mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
					onClick={handleGoogleAuth}
				>
					Continue with Google
				</button>
				<p
					onClick={toggleForm}
					className="mt-4 text-blue-500 text-center cursor-pointer hover:underline"
				>
					{isLogin
						? "Don't have an account? Signup"
						: "Already have an account? Login"}
				</p>
			</div>
		</div>
	);
};

export default UnifiedLoginSignup;
