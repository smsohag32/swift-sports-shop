import Logo from "@/assets/svg/Logo";
import { useForm } from "react-hook-form";

const Login = () => {
   const { register, handleSubmit } = useForm()

   const handleLogin = () => {

   }
   return (
      <div className="bg-[#f4f4f4]py-16 ">
         <div className="main-container">

            {/* login page content  */}
            <div>
               <h2></h2>
            </div>
            <div>

               {/* login form */}
               <form onClick={handleSubmit(handleLogin)}>
                  <div>
                     <Logo />
                     <p className="text-2xl font-medium text-title">Sign in</p>
                  </div>
                  <div>

                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
