import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { setLocalStorage, showToast } from "../utils";
import Button from "./global/Button";
import { useForm } from "react-hook-form";
import { EmailValidation } from "./global/Validation";
const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "" },
		resolver: yupResolver(EmailValidation),
		mode: "onSubmit",
	});
	const navigate = useNavigate();
	const handleOnSubmit = () => {
		handleSubmit((data) => {
			setLocalStorage("isLogin", "validuser");
			navigate("/quiz");
		})();
	};

	return (
		<div className="login-page">
			<h1>Login to the Quiz</h1>
			<input
				{...register("email")}
				type="email"
				placeholder="Enter your email"
				autoFocus
			/>
			<>
				{errors.email && (
					<span className="danger">{errors?.email?.message}</span>
				)}
			</>
			<Button type={"submit"} btnTxt={"Submit"} onClick={handleOnSubmit} />
		</div>
	);
};

export default Login;
