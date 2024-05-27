import React from "react";

export const Button = (prop) => {
    return (
        <button
            type="button"
            className={`px-3 py-1.5 bg-lime-600 dark:bg-slate-600 hover:bg-gray-700 dark:hover:bg-slate-400 ${prop.class} text-white rounded-[10px] cursor-pointer transition duration-300 ease-out ml-2`}
            onClick={prop.onClick}
        >
            {prop.subject}
        </button>
    );
};
