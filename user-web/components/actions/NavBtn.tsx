"use client";
import React from "react";
import Button from "../Button";
type Props = {
  children: React.ReactNode;
  route: string;
};

const NavBtn = ({ children, route }: Props) => {
  return <Button onClick={() => (window.location.href = route)}>{children}</Button>;
};

export default NavBtn;
