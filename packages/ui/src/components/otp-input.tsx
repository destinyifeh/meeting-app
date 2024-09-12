"use client";
import { CSSProperties } from "react";
import OtpInput from "react18-input-otp";

export type OtpInputFieldProps = {
  value: string;
  onChange: (otp: number) => void;
};
export const OtpInputField = ({ value, onChange }: OtpInputFieldProps) => {
  return (
    <div>
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={6}
        isInputNum={true}
        inputStyle={
          {
            marginRight: "10px",
            width: "6rem",
            height: "7rem",
            fontWeight: "400",
            fontSize: "3.2rem",
            lineHeight: "38.4rem",
            color: "#000",
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
