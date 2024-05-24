import React, { useState } from 'react';


function InputText({ labelTitle, lableStyle, type, containerStyle, defaultValue, updateFormValue, updateType, autoFocus, placeholder}) {
    const [value, setValue] = useState(defaultValue);

    const updateInputValue = (val) => {
        setValue(val);
        updateFormValue({ updateType, value: val});
    }

    return ( 
        <div className={`form-control w-full ${containerStyle}`}>
            <label>
                <span className={`label-text text-base-content ${lableStyle}`}>{labelTitle}</span>
            </label>
            <input type={type || "text"} autoFocus={autoFocus} placeholder={placeholder || ""} 
                    onChange={(e) => updateInputValue(e.target.value)}
                    className="h-[50px] rounded-lg px-[20px] w-full outline-none " />
        </div>
     );
}

export default InputText;