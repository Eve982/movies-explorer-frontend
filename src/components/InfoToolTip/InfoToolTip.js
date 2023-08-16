import "./InfoToolTip.css";
import successIcon from "../../images/success-icon.svg";
import failIcon from "../../images/fail-icon.svg";

function InfoTooltip({ isOpen, onClose, infoToolTip }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div
        className="popup__tip-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close-button hover-opacity"
          aria-label="Закрыть окно."
          onClick={onClose}
        ></button>
        <img
          className="popup__tip-icon"
          src={infoToolTip.status ? successIcon : failIcon}
          alt={infoToolTip.status ? "Черная галочка." : "Красный крест."}
        />
        <h3 className="popup__tip">{infoToolTip.text}</h3>
      </div>
    </div>
  );
}
export default InfoTooltip;
