import { DashboardLayout } from "@components/layout/dashboard-layout";
import { Params } from "app/_types";
import { ReactNode } from "react";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  return <DashboardLayout params={params}>{children}</DashboardLayout>;
};

export default Layout;
