import { forwardRef } from "react";

import { classNames } from "../lib/className";
import { ErrorMessage } from "./error-message";
import { Label } from "./label";

export type Inputprops = {
  isFullwidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<typeof Label>;
} & JSX.IntrinsicElements["input"];

type AddonProps = {
  children: React.ReactNode;
  isFilled?: boolean;
  className?: string;
  error?: boolean;
};

const Addon = ({ children, className }: AddonProps) => (
  <div
    className={classNames(
      "flex items-center px-2  border-slate-300 py-3 min-h-9 ",
      className
    )}
  >
    <span className="flex whitespace-nowrap items-center">{children}</span>
  </div>
);

export const Input = forwardRef<HTMLInputElement, Inputprops>(function Input(
  { isFullwidth, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "placeholder:text-[14px] overflow-hidden  mt-0 text-[1.6rem] bg-white block   rounded-md px-3 py-2 outline-none  focus:outline-none",
        isFullwidth && "w-full",
        props.className
      )}
    />
  );
});

export const InputField = forwardRef<HTMLInputElement, Inputprops>(
  function InputField(props, ref) {
    const {
      containerClassName,
      labelProps,
      isFullwidth,
      prefixIcon,
      suffixIcon,
      labelClassName,
      label,
      ...otherProps
    } = props;
    return (
      <div className={classNames("w-full", containerClassName)}>
        {label && <Label {...labelProps}>{label}</Label>}

        {prefixIcon || suffixIcon ? (
          <div className="border transition-all border-default relative  focus-within:ring-slate-900 flex  items-center justify-center rounded-md focus-within:outline-none focus-within:ring-1">
            {prefixIcon && (
              <Addon className={classNames("border-r-2")}>{prefixIcon}</Addon>
            )}
            <Input isFullwidth={isFullwidth} {...otherProps} ref={ref} />
            {suffixIcon && (
              <Addon
                className={classNames("border-l-2  border-none px-7 pr-7")}
              >
                {suffixIcon}
              </Addon>
            )}
          </div>
        ) : (
          <div className="border border-default overflow-hidden  group  focus-within:ring-slate-900 flex  items-center justify-center rounded-md focus-within:outline-none focus-within:ring-1">
            <Input isFullwidth={isFullwidth} {...otherProps} ref={ref} />
          </div>
        )}

        <ErrorMessage fieldName={props.name || ""} />
      </div>
    );
  }
);

export const EmailInputField = forwardRef<HTMLInputElement, Inputprops>(
  function EmailInputField(props, ref) {
    return (
      <InputField
        type="email"
        inputMode="email"
        autoCorrect="off"
        autoCapitalize="none"
        {...props}
        ref={ref}
      />
    );
  }
);
