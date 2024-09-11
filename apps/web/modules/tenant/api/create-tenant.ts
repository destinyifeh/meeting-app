import { fetchJson, getCookie } from "@vms/lib";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { makeQueryClient } from "@lib/tanstack-provider";
import { showToast } from "@vms/ui";

export const CreateTenantInputSchema = z.object({
  Email: z.string().min(1, "Required").email("Invalid email"),
  Name: z.string().min(3, "Required"),
  Description: z.string(),
});

export type createTenantLogoInput = z.infer<typeof CreateTenantLogSchema>;

export type createTenantinInput = z.infer<typeof CreateTenantInputSchema>;

export const CreateTenantLogSchema = z.object({
  PrimaryColour: z.string().min(1, "Required"),
  Logo: z.instanceof(File),
});

export type CreateTenantType = createTenantLogoInput &
  createTenantinInput & { SecondaryColour: string };

type ServerResponse = {
  data: TenantResponse;
};

export type TenantResponse = {
  data: Record<string, string>;
};

export const createTenantFn = (data: CreateTenantType) => {
  const token = getCookie("accessToken");

  data["SecondaryColour"] = data.PrimaryColour;

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return fetchJson<ServerResponse>(`${API_BASE_URL}/admin/tenant/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const useCreateTenant = (
  options?: Omit<
    UseMutationOptions<ServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createTenantFn,
    onSuccess: (...args) => {
      makeQueryClient().invalidateQueries({ queryKey: ["tenants"] });
      showToast("Tenant created successfully.", "success");
      options?.onSuccess?.(...args);
    },
  });
};
