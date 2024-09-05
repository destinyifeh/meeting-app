import { DashboardLayout } from "@components/layout/dashboard-layout";
import { LayoutProps } from "app/_types";

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;

// const Layout = () => {
//   return <DashboardLayout>Heleoo wolrd</DashboardLayout>;
// };

// export default Layout;
