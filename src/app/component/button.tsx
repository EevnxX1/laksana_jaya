import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, type}: ButtonProps) {
  return (
    <button
    type={type}
    className={clsx(
        "w-[270px] h-[40px] text-center text-sm rounded-lg cursor-pointer", className
    )}
    >
      {children}
    </button>
  );
}
