import React from "react";
import clsx from "clsx";

interface InputForm extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  classLabel?: string;
  classInput?: string;
  classPage?: string;
}

export function InputTbl({
  children,
  classLabel,
  classInput,
  classPage,
  ...rest
}: InputForm) {
  return (
    <div
      className={clsx(
        "flex items-center w-[38vw] justify-between",
        // responsive max=1400px
        "max-[1600px]:w-[35vw]",
        // responsive

        // resoponsive max=1050px
        "max-[1050px]:w-[36vw]",
        //responsive
        classPage
      )}
    >
      <label
        className={clsx(
          "text-lg",
          // responsive max=1400px
          "max-[1400px]:text-sm max-[1400px]:w-[100px]",
          // resposive
          classLabel
        )}
      >
        {children}
      </label>
      <input
        {...rest}
        className={clsx(
          "bg-white/15 w-[70%] px-4 py-[6px] rounded-lg",
          // responsive min=1400px
          "min-[1400px]:h-[45px]",
          // responsive

          // responsive min=1150px
          "min-[1150px]:h-[40px]",
          // responsive

          // resoponsive max=1050px
          "max-[1050px]:w-[65%]",
          "max-[1050px]:h-[43px]",
          //responsive

          classInput
        )}
      />
    </div>
  );
}

interface SelectForm extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  classLabel?: string;
  classSelect?: string;
  classPage?: string;
  labelValue: string;
}

export function SelectTbl({
  children,
  classLabel,
  classSelect,
  classPage,
  labelValue,
  ...rest
}: SelectForm) {
  return (
    <div
      className={clsx(
        "flex items-center w-[38vw] justify-between",
        // responsive max=1400px
        "max-[1600px]:w-[35vw]",
        // responsive

        // resoponsive max=1050px
        "max-[1050px]:w-[36vw]",
        //responsive
        classPage
      )}
    >
      <label
        className={clsx(
          "text-lg",
          // responsive max=1400px
          "max-[1400px]:text-sm max-[1400px]:w-[100px]",
          // resposive
          classLabel
        )}
      >
        {labelValue}
      </label>
      <select
        {...rest}
        className={clsx(
          "bg-white/15 w-[70%] px-4 py-[6px] rounded-lg",
          // responsive min=1400px
          "min-[1400px]:h-[45px]",
          // responsive

          // responsive min=1150px
          "min-[1150px]:h-[40px]",
          // responsive

          // resoponsive max=1050px
          "max-[1050px]:w-[65%]",
          "max-[1050px]:h-[43px]",
          //responsive

          classSelect
        )}
      >
        {children}
      </select>
    </div>
  );
}
