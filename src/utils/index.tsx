import { toast, TypeOptions } from "react-toastify";
/**
 * Store Management
 * @param key
 * @param store
 */
export const getItemFromStore = (key: string, store = localStorage) => {
	const storedData = store.getItem(key);
	return storedData ? JSON.parse(storedData) : null;
};
export const setItemToStore = (
	key: string,
	payload: any,
	store = localStorage
) => store.setItem(key, JSON.stringify(payload));
export const removeItemFromStore = (key: string, store = localStorage) =>
	store.removeItem(key);

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

// Function to show an alert
export const showAlert = () => {
	window.alert(
		"Are you sure you want to leave this page? You will be logged out and your data will be lost"
	);
};
