import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetchJson } from "@vms/lib";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";
import { ServerResponse } from "./login";

export const otpInputSchema = z.object({
  userId: z.string().min(1, "Required"),
  otp: z.string().min(6, "Required"),
});

export type otpInput = z.infer<typeof otpInputSchema>;

export const otpFn = (data: otpInput) => {
  return fetchJson<ServerResponse>(`${API_BASE_URL}/auth/otp/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// export type ServerResponse = {
//   data: LoginResponse;
// };

// export type LoginResponse = {
//   data: string;
//   firstName: string;
//   accessToken: string;
//   userId: string;
//   userName: string;
//   otp?: string;
//   role: string;
// };

export const useOtp = (
  options?: Omit<
    UseMutationOptions<ServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: otpFn,
  });
};
