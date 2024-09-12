import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetchJson } from "@vms/lib";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

export type loginInput = z.infer<typeof loginInputSchema>;

export const loginFn = (data: loginInput) => {
  return fetchJson<ServerResponse>(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export type ServerResponse = {
  data: LoginResponse;
};

export type LoginResponse = {
  data: string;
  firstName: string;
  accessToken: string;
  userId: string;
  userName: string;
  otp?: string;
  role: string;
};

export const useLogin = (
  options?: Omit<
    UseMutationOptions<ServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: loginFn,
  });
};
