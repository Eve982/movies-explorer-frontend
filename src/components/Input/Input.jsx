import { ErrorMessage } from "@hookform/error-message";
import { REGEX_EMAIL } from "../../utils/constants";
// import Input from "../Input/Input";
// Не могу понять как реализовать отображение ошибок живой
// валидации react-hook-form при передаче errros в компонент <Input>.
// Также пока непонятно, нужно ли прописывать value тега input при
// использовании react-hook-form...
function Input({
  label,
  type,
  register,
  inputsData,
  inputsDataHandler,
  errors,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    inputsDataHandler({
      ...inputsData,
      [name]: value,
    });
  };

  const emailRules = {
    pattern: {
      value: REGEX_EMAIL,
      message: "Email должен иметь формат xxx@xxx.xx.",
    },
  };
  const passwordRules = {
    minLength: {
      value: 3,
      message: "Пароль должен содержать минимум 3 символа.",
    },
    maxLength: {
      value: 8,
      message: "Пароль должен содержать максимум 8 символов.",
    },
  };
  const nameRules = {}; // в форме логина не используется

  const setRules = () => {
    if (type === "email") {
      return emailRules;
    }
    if (type === "password") {
      return passwordRules;
    }
    return nameRules;
  };

  return (
    <>
      <label className="form__input-lable">
        {label}
        <input
          className="form__input"
          type={type}
          placeholder={label}
          autoComplete="on"
          {...register(type, {
            onChange: (e) => {
              handleChange(e);
            },
            required: "Поле обязательно к заполнению.",
            setRules,
          })}
        />
      </label>
      {/* <ErrorMessage className="form__error" errors={errors} name="name" as="span" /> */}
      {errors?.[type] && (
        <span className="form__error">{errors[type].message}</span>
      )}
    </>
  );
}

export default Input;
