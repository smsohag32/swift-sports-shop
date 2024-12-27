import Loading from "@/components/loading/Loading";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [loginLoading, setLoginLoading] = useState(false);
   const [registerLoading, setRegisterLoading] = useState(false);

   const commonUrl = "http://192.168.1.37:8080/api/v1";
   const faceCheck = "https://ekycapi.p2msoft.com/api/anti_spoofing";

   useEffect(() => {
      const token = localStorage.getItem("go-token");
      const userInfo = localStorage.getItem("go-userInfo");

      if (token && userInfo) {
         try {
            const user = JSON.parse(userInfo);
            setUser(user);
         } catch (error) {
            console.error("Error parsing user info:", error);
         }
      }

      setLoading(false);
   }, []);

   const logIn = async (phoneNo, password) => {
      setLoginLoading(true);
      try {
         const response = await fetch(`${commonUrl}/users/login`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneNo, password }),
         });

         if (response.ok) {
            const user = await response.json();

            if (user && user.id) {
               // Assuming `id` indicates successful login
               setUser(user);
               localStorage.setItem("go-token", user.token || "");
               localStorage.setItem("go-userInfo", JSON.stringify(user));
               return true;
            } else {
               return false;
            }
         } else {
            return false;
         }
      } catch (error) {
         console.error("Error during login:", error);
         return false;
      } finally {
         setLoading(false);
         setLoginLoading(false);
      }
   };

   const register = async ({ name, phoneNo, email, nidNo, password }) => {
      setRegisterLoading(true);
      try {
         const response = await fetch(`${commonUrl}/users`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phoneNo, email, nidNo, password }),
         });
         if (response.ok) {
            const { token, ...user } = await response.json();
            setUser(user);
            localStorage.setItem("go-token", token);
            localStorage.setItem("go-userInfo", JSON.stringify(user));
            return { success: true };
         } else if (response.status === 409) {
            return { success: false, error: { message: "User already exists" } };
         } else {
            const errorData = await response.json();
            console.error("Registration failed:", errorData);
            return { success: false, error: errorData };
         }
      } catch (error) {
         console.error("Error during registration:", error);
         return { success: false, error };
      } finally {
         setRegisterLoading(false);
      }
   };

   const logOut = () => {
      setUser(null);
      localStorage.removeItem("go-token");
      localStorage.removeItem("go-userInfo");
   };

   const authInfo = {
      user,
      loading,
      logIn,
      logOut,
      register,
      commonUrl,
      loginLoading,
      registerLoading,
      setUser,
      setLoginLoading,
      setRegisterLoading,
      faceCheck,
   };

   return (
      <AuthContext.Provider value={authInfo}>
         {loading ? <Loading /> : children}
      </AuthContext.Provider>
   );
}
