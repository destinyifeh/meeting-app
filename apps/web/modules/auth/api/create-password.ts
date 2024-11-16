import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetchJson, passwordValidator } from "@vms/lib";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";
import { ServerResponse } from "app/_types";

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .superRefine((password, ctx) => {
        const passwordTestResult = passwordValidator(password);
        Object.keys(passwordTestResult).map((rule) => {
          const ruleCtx =
            passwordTestResult[rule as keyof typeof passwordTestResult];
          if (!ruleCtx.validator) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: ruleCtx?.message,
              path: [rule],
            });
          }
        });
      }),

    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to the field where the error should be displayed
  });

export type createPasswordInput = {
  password: string;
  confirmPassword: string;
};

// export type createPasswordInput = z.infer<typeof createPasswordSchema>;

export const createPasswordFn = (data: Record<string, string>) => {
  return fetchJson<ServerResponse<Record<string, string>>>(
    `${API_BASE_URL}/account/activate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
};

export const useCreatePassword = (
  options?: Omit<
    UseMutationOptions<ServerResponse<Record<string, string>>, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createPasswordFn,
  });
};
