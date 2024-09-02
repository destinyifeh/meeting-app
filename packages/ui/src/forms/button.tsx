import { ReactNode } from "react";

export const Button = ({ children }: { children: ReactNode }) => {
  return <button type="button">{children}</button>;
};
