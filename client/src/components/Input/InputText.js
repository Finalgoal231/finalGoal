import { useState } from "react";

function InputText({
  name,
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  placeholder,
  value,
  setHandleKeyDown,
  onChange,
}) {
  return (
    <div className={`form-control w-full flex sm:flex-row flex-col my-2 ${containerStyle}`}>
      <label className="label w-1/5">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <input
        name={name}
        type={type || "text"}
        placeholder={placeholder || ""}
        onChange={onChange}
        value={value}
        onKeyDown={setHandleKeyDown}
        className="input  input-bordered w-4/5 "
      />
    </div>
  );
}

export default InputText;
