import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItemFromStore } from "../utils";

const PublicRoutes = () => {
	const isAuthenticated = getItemFromStore("isLogin") ? true : false;
	return !isAuthenticated ? <Outlet /> : <Navigate to="/quiz" />;
};

export default PublicRoutes;
