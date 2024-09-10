"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, InputField, PasswordInputField } from "@vms/ui";
import classNames from "classnames";
import { jwtDecode } from "jwt-decode";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ServerResponse, useLogin } from "~/auth/api/login";

export const loginScheme = z.object({
  password: z.string().trim().min(1, { message: "Password is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});

type FormValue = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  const methods = useForm<FormValue>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: ServerResponse) => {
    const { exp } = jwtDecode(response.data.accessToken);

    if (isChecked) {
      document.cookie = `rememberMe=yes;path=/;max-age=${exp};SameSite=Lax;`;
    } else {
      document.cookie = `rememberMe=no;path=/;max-age=${exp};SameSite=Lax;`;
    }

    document.cookie = `accessToken=${response.data.accessToken};path=/;max-age=${exp};SameSite=Lax;`;

    router.replace(redirectTo ? redirectTo : "/app/tenants");
  };

  const login = useLogin({
    onSuccess,
  });

  const onSubmit = async (data: FormValue) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    if (isChecked) {
    }
    await login.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full block mb-[1.6rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <div className="space-y-4">
            <InputField
              type="email"
              placeholder="Email"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("email")}
            />

            <PasswordInputField
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("password")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-xl leading-[16.8px] gap-2 font-lato">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                setIsChecked(checked);
              }}
            />
            Remember me
          </label>
        </div>

        {login.isError && (
          <ErrorMessage
            {...(JSON.parse(login.error.message)?.error as ErrorMessageProps)}
          />
        )}

        <Button
          type="submit"
          variant="secondary"
          size="large"
          loading={login.isPending}
          disabled={login.isPending}
          className={classNames(
            formState.isValid
              ? "bg-brand-default text-white hover:bg-brand-default"
              : "cursor-not-allowed",
            "w-full",
            login.isPending && "opacity-60"
          )}
        >
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};

type ErrorMessageProps = {
  message: string;
  code: string;
};
export const ErrorMessage = ({ message, code }: ErrorMessageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = "none";
        }
      }, 9000);
    }

    () => {
      clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="rounded-md my-7  p-5 bg-red-100 text-red-900 text-[14px] font-medium"
    >
      {message}
    </div>
  );
};
