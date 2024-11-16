import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { fetchJson, getCookie } from "@vms/lib";
import { PagedResponse, ServerResponse } from "app/_types";

export const getTenantHandler = async (
  req: Record<string, string>
): Promise<PagedResponse<TenantProps>> => {
  const query = new URLSearchParams(req).toString();
  const token = getCookie("accessToken");
  const res = await fetchJson<ServerResponse<PagedResponse<TenantProps>>>(
    `${API_BASE_URL}/admin/tenant/search?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res?.data as PagedResponse<TenantProps>;
};

export type GetTenantFnProps = {
  page?: number;
};

const getTenantFn = async (
  data: Record<string, string>
): Promise<PagedResponse<TenantProps>> => {
  const response = await getTenantHandler(data);
  return response;
};

export type queryConfigOption = {
  filter: Record<string, string>;
  enabled?: boolean;
};

export type TenantProps = {
  createdAt: string;
  description: string;
  email: string;
  id: string;
  logo: string;
  name: string;
  primaryColour: string;
  secondaryColour: string;
  slug: string;
  status: string;
  tenantId: string;
};

export type TenantTableProps = Pick<
  TenantProps,
  "id" | "status" | "name" | "email"
>;

export const useGetContact = ({ filter, enabled }: queryConfigOption) => {
  return useQuery<PagedResponse<TenantProps>, Error>({
    queryKey: ["tenants", JSON.stringify(filter)],
    queryFn: () => getTenantFn(filter),
    enabled,
  });
};
