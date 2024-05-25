import React from "react";
import PropTypes from "prop-types";

function Input({ name, type, placeholder, setHandleKeyDown }) {
    const updateInputValue = (val) => {
        console.log(val);
    };
    return (
        <input
            name={name}
            type={type || "text"}
            placeholder={placeholder || ""}
            onChange={(e) => updateInputValue(e.target.value)}
            onKeyDown={setHandleKeyDown}
            className={`  w-full`}
        />
    );
}

Input.propTypes = {};

export default Input;
