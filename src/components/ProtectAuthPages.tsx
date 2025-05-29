import { Navigate } from "react-router-dom";
import { ReactNode, ReactElement } from "react";
import { checkUserLoggedIn } from "../_helpers/checkUserLoggedIn";

interface ProtectAuthPageProps {
  children: ReactNode;
}

const ProtectAuthPages: React.FC<ProtectAuthPageProps> = ({ children }): ReactElement | null => {
  const loggedIn = checkUserLoggedIn();

  return loggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export default ProtectAuthPages;
