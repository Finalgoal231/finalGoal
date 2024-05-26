import React from "react";
import PropTypes from "prop-types";

function Input({ name, type, placeholder, setHandleKeyDown, onChange, value, className }) {
  return (
    <input
      name={name}
      type={type || "text"}
      placeholder={placeholder || ""}
      onChange={onChange}
      value={value}
      onKeyDown={setHandleKeyDown}
      className={`w-full ${className}`}
    />
  );
}

Input.propTypes = {};

export default Input;
