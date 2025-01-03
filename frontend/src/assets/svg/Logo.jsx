import logoIcon from "@/assets/logo.png"
import { Link } from "react-router-dom"
const Logo = ({ className = "", width = "200", height = "50" }) => {
   return (
      <Link to={"/"} className="cursor-pointer">
         <img src={logoIcon} className={className} width={width} height={height} />
      </Link>
   )
}

export default Logo

