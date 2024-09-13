"use client";

import Shell from "@components/Shell";
import { ROLES } from "@lib/hooks/useAuthorization";
import { Params } from "app/_types";

import { createContext, ReactNode } from "react";

export const RoleContext = createContext<{ role: ROLES } | null>(null);

export const DashboardLayout = ({
  children,
  params,
  role,
}: {
  children: ReactNode;
  params: Params;
  role: ROLES;
}) => {
  return (
    <Shell params={params} role={role}>
      <RoleContext.Provider value={{ role }}> {children}</RoleContext.Provider>
    </Shell>
  );
};
