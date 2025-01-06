"use client";
import React from "react";
type Props = {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ children, type = "button", className, onClick, disabled }: Props) => {
  return (
    <button
      className={
        " px-3 border h-10 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
