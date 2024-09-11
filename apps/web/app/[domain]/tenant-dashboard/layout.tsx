import { TenantDashboardLayout } from "@components/layout/tenant-dashboard-layouit";
import { LayoutProps } from "app/_types";

const Layout = ({ children }: LayoutProps) => {
  return <TenantDashboardLayout>{children}</TenantDashboardLayout>;
};

export default Layout;
