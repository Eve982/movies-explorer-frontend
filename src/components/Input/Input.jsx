import { useState } from "react";

function Input({
  label,
  type,
  autoComplete,

  textError,
  validator,
  onError,
  ...props
}) {
  const [value, setValue] = useState("");
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [validateError, setValidateError] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  return (
    <>
      <label className="form__input-lable">
        {label}
        <input
          className="form__input"
          type={type}
          name={type}
          placeholder={label}
          value={userLoginData.type}
          onChange={handleChange}
          onBlur={(e) => {
            if (validator) {
              setValidateError(!validator(e.target.value));
            }
            if (onError) {
              onError({ [label]: validator(e.target.value) });
            }
          }}
          autoComplete={autoComplete}
          required
          {...props}
        />
        {validateError ? <span>{textError}</span> : null}
      </label>
      <span className="form__error">{errors}</span>
    </>
  );
}

export default Input;
