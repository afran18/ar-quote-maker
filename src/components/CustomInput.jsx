import React from "react";

function CustomInput({
  label,
  type = "text",
  name,
  id,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="input-group">
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
