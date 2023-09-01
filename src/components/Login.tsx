import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { setItemToStore, showToast } from "../utils";
import Button from "./global/Button";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import * as Yup from "yup";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string()
          .required("Email is required")
          .email("Please enter a valid email address "),
      })
    ),
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  /**
   * The function `handleOnSubmit` handles form submission, sets user data in local storage, shows a
   * success toast message, and navigates to the "/quiz" page.
   */
  const handleOnSubmit = () => {
    handleSubmit((data) => {
      setItemToStore("userData", data.email);
      showToast("Welcome to the Josh Talks Quiz", "success");
      navigate("/quiz");
    })();
  };

  return (
    <div className="login-page">
      <h1>Login to the Quiz</h1>
      <input
        {...register("email")}
        type="email"
        className={classnames({ invalid: errors.email })}
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
