"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { VeryficationModel, VeryficationSchema } from "@/schemas/VeryficationSchema";
import { verifyOrder } from "@/api/order";

type Props = {
  order_id: string;
};

const VeryficationForm = ({ order_id }: Props) => {
  const [otp, setOtp] = useState("");
  const form = useForm<VeryficationModel>({
    resolver: zodResolver(VeryficationSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (values: VeryficationModel) => {
    const ans = await verifyOrder(order_id, values);
    if ("error" in ans) {
      setError(ans.error);
    } else {
      window.location.reload();
    }
  };
  return (
    <form>
      <div className="form-box">
        <label>Kod weryfikacjyjny</label>
        <OTPInput
          value={otp}
          onChange={(code) => {
            setOtp(code);
            form.setValue("confirmation_code", code);
            if (code.length === 6) {
              form.handleSubmit(onSubmit)();
            }
          }}
          numInputs={6}
          inputStyle={{
            width: "40px",
            height: "40px",
            margin: "0 5px",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
          }}
          renderInput={(props) => <input {...props} />}
        />
        <div className="errors">
          <p>{form.formState.errors.confirmation_code?.message}</p>
          <p>{error}</p>
        </div>
      </div>
    </form>
  );
};

export default VeryficationForm;
