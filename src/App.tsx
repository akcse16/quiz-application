import React, { useEffect } from "react";
import "./assets/scss/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteStack from "./routes";
function App() {
	// Function to show an alert
	const showAlert = () => {
		window.alert("Are you sure you want to leave this page?");
	};

	// Add event listeners to detect the refresh action
	useEffect(() => {
		const handlePopState = (event: any) => {
			// Show the alert when the refresh action is detected
			showAlert();
			// Cancel the page reload by returning a confirmation message
			event.returnValue = "Are you sure you want to leave this page?";
			localStorage.clear();
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			// Clean up the event listeners when the component unmounts

			window.removeEventListener("popstate", handlePopState);
		};
	}, []);
	return (
		<React.Fragment>
			<RouteStack />
			<ToastContainer />
		</React.Fragment>
	);
}

export default App;
