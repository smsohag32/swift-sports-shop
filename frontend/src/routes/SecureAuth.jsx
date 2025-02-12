import useAuth from "@/hooks/useAuth";

const Secure = ({ userTypes, children }) => {
   const { user } = useAuth();
   console.log(user)
   return user && userTypes.includes(user?.role) ? <>{children}</> : null;
};

export default Secure;
