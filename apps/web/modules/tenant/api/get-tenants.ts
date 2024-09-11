import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { fetchJson, getCookie } from "@vms/lib";

export const getTenantHandler = (
  req: Record<string, string>
): Promise<unknown> => {
  const query = new URLSearchParams(req).toString();
  const token = getCookie("accessToken");
  return fetchJson<unknown>(`${API_BASE_URL}/admin/tenant/search?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export type GetTenantFnProps = {
  page?: number;
};

const getTenantFn = async (data: Record<string, string>): Promise<unknown> => {
  const response = await getTenantHandler(data);
  return response;
};

export type queryConfigOption = {
  filter: Record<string, string>;
  enabled?: boolean;
};

export const useGetContact = ({ filter, enabled }: queryConfigOption) => {
  return useQuery<unknown, Error>({
    queryKey: ["tenants"],
    queryFn: () => getTenantFn(filter),
    enabled,
  });
};
