import React from "react";
import styles from "./CustomInput.module.css";




function CustomInput({
  label,
  type = "text",
  name,
  id,
  value,
  onChange,
  required = false,
  className = "",
  error = false,
}) {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      <label htmlFor={id} className={error ? styles.errorLabel : ""}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        className={error ? styles.errorInput : ""}
      />
    </div>
  );
}
export default CustomInput;
