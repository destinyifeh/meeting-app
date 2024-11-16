import { DashboardLayout } from "@components/layout/dashboard-layout";
import { ROLES } from "@lib/hooks/useAuthorization";
import { Params } from "app/_types";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  const role = cookies().get("role")?.value as ROLES;

  return (
    <DashboardLayout params={params} role={role}>
      {children}
    </DashboardLayout>
  );
};

export default Layout;
