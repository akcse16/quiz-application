import React, { useEffect } from "react";
import "./assets/scss/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteStack from "./routes";
function App() {
  // Function to show an alert
  const showAlert = () => {
    window.alert(
      "Are you sure you want to leave this page? You will be logged out and your data will be lost"
    );
  };

  // Add event listeners to detect the refresh action
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Show the alert when the refresh action is detected
      showAlert();
      // Cancel the page reload by returning a confirmation message
      event.returnValue = "Are you sure you want to leave this page?";
	  localStorage.clear()
    };

    const handleKeyDown = (event: any) => {
      // Detect Ctrl + R (or Command + R on Mac) keyboard shortcut
      if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        // Prevent the default browser refresh behavior
        event.preventDefault();
        // Show the alert
        showAlert();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Clean up the event listeners when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
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
