import Loading from "@/components/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux-store/slice/authSlice";
import useAuth from "@/hooks/useAuth";

const SecureRoute = ({ userTypes, children }) => {
   const { user, isLoading } = useAuth();
   const location = useLocation();
   const dispatch = useDispatch();

   if (isLoading) {
      return <Loading />;
   }
   // && user?.userType && userTypes?.includes(user.userType)
   if (user && userTypes.includes(user?.role)) {
      return children;
   }
   dispatch(logoutUser());
   return <Navigate to="/authentication/login" state={{ from: location }} />;
};

export default SecureRoute;
