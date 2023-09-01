import React from "react";
import Loader from "./Loader";
interface ButtonProps {
	type: any;
	btnTxt: string;
	onClick: () => void;
	btnClass?: string;
	isLoading?: boolean;
	disabled?: boolean;
}
const Button = (props: ButtonProps) => {
	const { type, btnTxt, onClick, btnClass, isLoading, disabled } = props;
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={() => {
				if (!isLoading) onClick();
			}}
			className={`common_btn ${btnClass ? btnClass : ""} ${
				disabled ? "disabled" : ""
			}`}
		>
			{isLoading ? <Loader /> : <>{btnTxt}</>}
		</button>
	);
};

export default Button;
