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
