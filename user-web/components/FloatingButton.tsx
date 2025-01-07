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
      className="fixed left-3 bottom-3 instagram rounded-full p-4 z-[50]"
      onClick={() => (window.location.href = "https://www.instagram.com/blueelephantt_?igsh=Mm9tODhscnk2YzJm")}
    >
      <InstagramIcon className="text-background" width={30} height={30} />
    </motion.button>
  );
};

export default FloatingButton;
