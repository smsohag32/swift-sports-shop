import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ photo, name, }, ...props) => {
   return (
      <Avatar {...props}>
         <AvatarImage src={photo || "https://lh3.googleusercontent.com/a/ACg8ocLCcTZmLK8f8H-LaA8AyDKo3ULmG0sANVr_qyMG6a8dLX6FijdI=s360-c-no"} alt={name || "View Stat"} />
         <AvatarFallback>{name ? name?.slice(0, 2) : "VS"}</AvatarFallback>
      </Avatar>
   );
};

export default UserAvatar;
