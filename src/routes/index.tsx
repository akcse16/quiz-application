import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Quiz from "../components/Quiz/Quiz";
import Report from "../components/Quiz/Report";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const RouteStack = () => {
	return (
		<Routes>
			<Route element={<PrivateRoutes />}>
				<Route path={"quiz"} element={<Quiz />}></Route>
				<Route path={"report"} element={<Report />}></Route>
				<Route path={"/"} element={<Quiz />}></Route>
			</Route>
			<Route element={<PublicRoutes />}>
				<Route path={"login"} element={<Login />}></Route>
				<Route path={"/"} element={<Login />}></Route>
			</Route>
		</Routes>
	);
};

export default RouteStack;
