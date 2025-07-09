import React from "react";
import clsx from "clsx";

interface InputForm extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
    classLabel?: string;
    classInput?: string;
    classPage?: string;
}

export function InputTbl({children, classLabel, classInput, classPage, ...rest}:InputForm) {
    return(
        <div className={clsx("flex items-center space-y-1 space-x-16", classPage)}>
            <label className={clsx('', classLabel)}>{children}</label>
            <input {...rest} className={clsx("bg-white/15 w-[250px] min-[1700px]:w-[500px] min-[1400px]:w-[370px] min-[1440px]:w-[350px] px-4 py-[6px] min-[1400px]:h-[45px] min-[1150px]:h-[40px] rounded-lg", classInput)}/>
        </div>
    );
}