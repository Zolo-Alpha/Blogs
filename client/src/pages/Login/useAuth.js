import { useState, useEffect } from "react";
import apiClient from "../../helper/apiClient";

export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await apiClient.get("/auth/user");
				setIsLoggedIn(true);
			} catch {
				setIsLoggedIn(false);
			}
		};
		checkLoginStatus();
	}, []);

	const setLoggedIn = (status) => {
		setIsLoggedIn(status);
	};

	return { isLoggedIn, setLoggedIn };
};
