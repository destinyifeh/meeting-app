import { TenantDashboardLayout } from "@components/layout/tenant-dashboard-layouit";
import { LayoutProps } from "app/_types";

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <TenantDashboardLayout params={params}>{children}</TenantDashboardLayout>
  );
};

export default Layout;
