import successIcon from "../../images/success-icon.svg";
import failIcon from "../../images/fail-icon.svg";

function InfoTooltip({ isOpen, onClose, isSucsess, text }) {
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
          src={isSucsess ? successIcon : failIcon}
          alt={isSucsess ? "Красный крест." : "Зеленая галочка."}
        />
        <h3 className="popup__tip">{text}</h3>
      </div>
    </div>
  );
}
export default InfoTooltip;
