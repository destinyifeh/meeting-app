import { RoleContext } from "@components/layout/dashboard-layout";
import { ReactNode, useContext } from "react";

export enum ROLES {
  SUPERADMIN = "SuperAdmin",
  TENANT = "Tenant",
}

export type RoleTypes = keyof typeof ROLES;

let user = {
  role: ROLES?.SUPERADMIN,
};
export const useAuthorization = () => {
  const userRole = useContext(RoleContext);

  const checkAccess = ({ allowedRoles }: { allowedRoles: ROLES[] }) => {
    if (allowedRoles && allowedRoles.length > 0 && user) {
      return allowedRoles.includes(userRole?.role as ROLES);
    }

    return true;
  };

  return { checkAccess, role: user.role };
};

export const Authorization = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: ROLES[];
}) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;
  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  return <>{canAccess ? children : <div>Oops page not available</div>}</>;
};
