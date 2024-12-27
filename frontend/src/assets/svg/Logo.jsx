import logoIcon from "@/assets/logo.png"
const Logo = ({ className = "", width = "200", height = "50" }) => {
   return (
      <img src={logoIcon} className={className} width={width} height={height} />
   )
}

export default Logo

