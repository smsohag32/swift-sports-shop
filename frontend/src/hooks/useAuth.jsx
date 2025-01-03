import { useSelector } from "react-redux";

const useAuth = () => {
   const { user, token, isLoading } = useSelector((state) => state.auth)
   return { user, token, isLoading }
};

export default useAuth;
