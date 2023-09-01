import React from "react";
import Button from "./Button";
interface ConfirmationModal {
	onSubmit?: any;
	title?: string;
	desc?: string;
	onClose?: () => void;
	btnTxt?: string;
	className?: string;
}
const ConfirmationModal = (props: ConfirmationModal) => {
	const { onSubmit, title, desc, onClose, btnTxt, className } = props;
	return (
		<div className={"modal show"}>
			<div
				className={className ? `${className} modal-section` : "modal-section"}
			>
				<div className="modal-top-part">
					<button className="close">
						<img src="/images/cross.svg" alt="" onClick={onClose} />
					</button>

					{title && <h5>{title}</h5>}
					{desc && <p>{desc}</p>}
				</div>
				<Button
					type={"submit"}
					btnTxt={btnTxt ? btnTxt : "Confirm"}
					btnClass={"backtologin"}
					onClick={onSubmit}
				/>
			</div>
		</div>
	);
};

export default ConfirmationModal;
