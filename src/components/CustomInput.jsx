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
}) {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
export default CustomInput;
