import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";

const ProtectedRoute = ({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) => {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
