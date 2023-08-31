import React from "react";

const Loader = () => {
	return (
		<div className="lds-ring">
			<img style={{ width: "50px" }} src="/images/spinner.svg" alt="loader" />
		</div>
	);
};

export default Loader;
