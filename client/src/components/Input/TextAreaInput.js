import { useState } from "react";

function TextAreaInput({ labelTitle, labelStyle, name, containerStyle, placeholder, className }) {
    const updateInputValue = (val) => {
        console.log(val);
    };

    return (
        <div className={`form-control w-full flex sm:flex-row flex-col ${containerStyle}`}>
            <label className="label w-1/5">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <textarea
                name={name}
                className={`textarea textarea-bordered w-4/5 columns-10 ${className}`}
                placeholder={placeholder || ""}
                onChange={(e) => updateInputValue(e.target.value)}
            ></textarea>
        </div>
    );
}

export default TextAreaInput;
