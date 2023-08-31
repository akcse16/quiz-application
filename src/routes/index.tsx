import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Quiz from "../components/Quiz";
import Report from "../components/Report";
import PrivateRoutes from "./PrivateRoutes";

const RouteStack = () => {
	return (
		<Routes>
			{/* <Route element={<PrivateRoutes />}></Route> */}
			<Route path={"login"} element={<Login />}></Route>
			<Route path={"quiz"} element={<Quiz />}></Route>
			<Route path={"report"} element={<Report />}></Route>
			<Route path={"/"} element={<Login />}></Route>
		</Routes>
	);
};

export default RouteStack;
