import React, { useEffect } from "react";
import "./assets/scss/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteStack from "./routes";
function App() {
	return (
		<React.Fragment>
			<RouteStack />
			<ToastContainer />
		</React.Fragment>
	);
}

export default App;
