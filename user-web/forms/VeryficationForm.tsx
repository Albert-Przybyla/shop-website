"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { VeryficationModel, VeryficationSchema } from "@/schemas/VeryficationSchema";
import { verifyOrder } from "@/api/order";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

type Props = {
  order_id: string;
};

const VeryficationForm = ({ order_id }: Props) => {
  const notify = (t: string) => toast(t);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<VeryficationModel>({
    resolver: zodResolver(VeryficationSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (values: VeryficationModel) => {
    setLoading(true);
    const ans = await verifyOrder(order_id, values);
    if ("error" in ans) {
      notify(ans.error);
      setError(ans.error);
    } else {
      setError(null);
      window.location.reload();
    }
    setLoading(false);
  };
  return (
    <form className="space-y-12 flex flex-col items-center">
      <h3 className="text-2xl font-bold px-3 text-center">
        Wysłaliśmy kod weryfikacyjny na podany adres e-mail. Wpisz go poniżej.
      </h3>
      <div className="form-box">
        <label>Kod weryfikacjyjny</label>
        <OTPInput
          value={otp}
          onChange={(code) => {
            form.setValue("confirmation_code", code);
            setOtp(code);
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
      <Loader loading={loading} />
    </form>
  );
};

export default VeryficationForm;
