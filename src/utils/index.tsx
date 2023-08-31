import { toast, TypeOptions } from "react-toastify";

export const getItemFromStore = (key: string) => {
	const storedData = window.localStorage.getItem(key);
	return storedData ? JSON.parse(storedData) : null;
};
export const setLocalStorage = (key: string, value: any) =>
	window.localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorage = (key: string) =>
	window.localStorage.removeItem(key);

export const showToast = (
	message: string | any,
	type: TypeOptions,
	toastId?: any
) => {
	toast(message, {
		position: "top-right",
		autoClose: 1000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		type,
		className: `toast_${type}`,
		toastId: toastId || undefined,
	});
};
export const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const shuffleArray = (item: any) => {
	return item.sort(() => 0.5 - Math.random());
};
// export const isUserAuthenticated = () => getLocalStorage("isLogin");
