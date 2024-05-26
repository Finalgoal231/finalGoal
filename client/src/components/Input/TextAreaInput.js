import { useState } from "react";

function TextAreaInput({ labelTitle, labelStyle, value, name, containerStyle, placeholder, className, onChange }) {
  return (
    <div className={`form-control w-full flex sm:flex-row flex-col ${containerStyle}`}>
      <label className="label w-1/5">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <textarea
        name={name}
        className={`textarea textarea-bordered w-4/5 columns-10 ${className}`}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
