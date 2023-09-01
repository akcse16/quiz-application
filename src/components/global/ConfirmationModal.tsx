import classnames from "classnames";
import Button from "./Button";
interface ConfirmationModalInterFace {
  onSubmit?: any;
  title?: string;
  desc?: string;
  onClose?: () => void;
  btnTxt?: string;
  className?: string;
  show?: boolean;
}

const ConfirmationModal = (props: ConfirmationModalInterFace) => {
  const { onSubmit, title, desc, onClose, btnTxt, className, show } = props;
  return (
    <div className={classnames("modal", { show })}>
      <div className={classnames("modal-section", { [className as string]: className })}>
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
