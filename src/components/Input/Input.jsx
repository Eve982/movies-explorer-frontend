import { useState } from "react";

function Input({ label, textError, validator, onError, ...props }) {
  const [value, setValue] = useState("");
  const [validateError, setValidateError] = useState(false);
  return (
    <label className="form__input-lable">
      {label}
      <input
        required
        className="form__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (validator) {
            setValidateError(!validator(e.target.value));
          }
          if (onError) {
            onError({ [label]: validator(e.target.value) });
          }
        }}
        {...props}
      />
      {validateError ? <span>{textError}</span> : null}
    </label>
  );
}

export default Input;
