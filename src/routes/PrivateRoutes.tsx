import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItemFromStore } from "../utils";

const PrivateRoutes = () => {
	const isAuthenticated = getItemFromStore("userData") ? true : false;
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
