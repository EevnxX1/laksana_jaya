import clsx from "clsx";
import React from "react";

interface labelInput extends React.InputHTMLAttributes<HTMLInputElement> {
  classInput?: String;
}

export function Input({classInput, onChange, value, placeholder, type}:labelInput) {
    return(
        <div>
            <input 
            type={type} 
            onChange={onChange}
            value={value}
            placeholder={placeholder} 
            className={clsx('outline-none border border-gray-400 w-[270px] h-[40px] px-3 rounded-lg text-sm text-gray-200 placeholder:text-gray-200', classInput)}/>
        </div>
    );
}