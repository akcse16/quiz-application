import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailPattern, setLocalStorage, showToast } from "../utils";
import Button from "./global/Button";

const Login = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const handleOnSubmit = () => {
		console.log(email);

		if (email === "") {
			console.log("here");

			showToast("Please enter an email id", "error", "email");
		} else if (!EmailPattern.test(email)) {
			showToast("Please enter a valid email address", "error", "invalidEmail");
		} else {
			setLocalStorage("isLogin", "validuser");
			navigate("/quiz");
		}
	};
	return (
		<div className="login-page">
			<h1>Login to the Quiz</h1>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email"
			/>
			<Button type={"submit"} btnTxt={"Submit"} onClick={handleOnSubmit} />
		</div>
	);
};

export default Login;
