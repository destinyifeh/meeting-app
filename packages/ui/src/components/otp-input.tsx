"use client";
import { CSSProperties } from "react";
import OtpInput from "react18-input-otp";

export const OtpInputField = () => {
  return (
    <div>
      <OtpInput
        value="123456"
        onChange={() => {}}
        numInputs={6}
        inputStyle={
          {
            marginRight: "10px",
            width: "6rem",
            height: "7rem",
            fontWeight: "400",
            fontSize: "3.2rem",
            lineHeight: "38.4rem",
            padding: 0,
            outline: "none",
            backgroundColor: "var(--vms-brand-light)",
          } as CSSProperties
        }
      />
      ;
    </div>
  );
};
export default OtpInputField;
