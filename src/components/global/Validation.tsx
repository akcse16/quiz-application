import * as Yup from "yup";
export const EmailValidation = Yup.object().shape({
	email: Yup.string()
		.required("Email is required")
		.email("Please enter a valid email address "),
});
