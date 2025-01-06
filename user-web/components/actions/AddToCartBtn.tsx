"use client";
import React from "react";
import Button from "../Button";

type Props = {
  productId: string;
  quantity: number;
  sizeId: string;
};

const AddToCartBtn = ({ productId, quantity, sizeId }: Props) => {
  return <Button>Dodaj do koszyka</Button>;
};

export default AddToCartBtn;
