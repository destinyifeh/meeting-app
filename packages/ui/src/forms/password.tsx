"use client";

import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { InputField, Inputprops } from "./input";

export const PasswordInputField = forwardRef<HTMLInputElement, Inputprops>(
  function PasswordInputFielddd(props, ref) {
    const [visible, setVisible] = useState<boolean>(true);

    return (
      <InputField
        {...props}
        type={visible ? "password" : "text"}
        ref={ref}
        suffixIcon={
          visible ? (
            <button type="button" onClick={() => setVisible(false)}>
              <Eye size={14} className="text-black" />
            </button>
          ) : (
            <button type="button" onClick={() => setVisible(true)}>
              <EyeOff size={14} className="text-black" />
            </button>
          )
        }
      />
    );
  }
);
