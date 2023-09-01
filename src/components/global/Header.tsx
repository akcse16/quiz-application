import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
	title: string;
	showTimer?: boolean;
}
const Header = (props: HeaderProps) => {
	const { title, showTimer = true } = props;
	const [timeLeft, setTimeLeft] = useState(30 * 60);
	const navigate = useNavigate();

	useEffect(() => {
		if (timeLeft > 0) {
			const timerInterval = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);

			return () => clearInterval(timerInterval);
		} else if (timeLeft === 0) {
			navigate("/report", { replace: true });
		}
	}, [timeLeft, navigate]);

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
			localStorage.clear();
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
		<div className="header">
			<img src="/images/josh-logo.svg" alt="" />
			<h2>{title}</h2>
			{showTimer ? (
				<span className="timer">
					Time Left: {Math.floor(timeLeft / 60)} min {timeLeft % 60} sec
				</span>
			) : (
				<span className="empty_box"></span>
			)}
		</div>
	);
};

export default Header;
