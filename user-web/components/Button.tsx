"use client";
import React from "react";
type Props = {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

const Button = ({ children, type = "button", className, onClick }: Props) => {
  return (
    <button
      className={" px-3 border  h-10 hover:bg-foreground hover:text-background transition-all duration-300" + className}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
