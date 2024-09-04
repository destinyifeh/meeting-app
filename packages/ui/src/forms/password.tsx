"use client";

import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { InputField, Inputprops } from "./input";

export const PasswordInputField = forwardRef<HTMLInputElement, Inputprops>(
  function PasswordInputField(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <InputField
        type={visible ? "text" : "password"}
        inputMode="email"
        autoCorrect="off"
        autoCapitalize="none"
        {...props}
        ref={ref}
        suffixIcon={
          visible ? (
            <button type="button" onClick={() => setVisible(false)}>
              <Eye size={14} />
            </button>
          ) : (
            <button type="button" onClick={() => setVisible(true)}>
              <EyeOff size={14} />
            </button>
          )
        }
      />
    );
  }
);
