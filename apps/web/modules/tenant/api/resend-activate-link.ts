import { fetchJson, getCookie } from "@vms/lib";

import { API_BASE_URL } from "@config/constant";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ServerResponse } from "app/_types";

export type TenantResponse = {
  data: Record<string, string>;
};

export const createTenantFn = (tenantId: string) => {
  const token = getCookie("accessToken");

  return fetchJson<ServerResponse<Record<string, string>>>(
    `${API_BASE_URL}/admin/tenant/resend-activation-link?tenantId=${tenantId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const useResendActivationLink = (
  options?: Omit<
    UseMutationOptions<ServerResponse<Record<string, string>>, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createTenantFn,
  });
};
