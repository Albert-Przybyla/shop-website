"use client";
import { InstagramIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const FloatingButton = () => {
  return (
    <motion.button
      initial={{ x: "-150%", opacity: 0.6 }}
      animate={{ x: "0%", opacity: 1 }}
      type="button"
      className="fixed left-3 bottom-3 instagram rounded-full p-3"
    >
      <InstagramIcon className="text-background" />
    </motion.button>
  );
};

export default FloatingButton;
