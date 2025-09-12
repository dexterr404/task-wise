import Avatar from "@mui/material/Avatar";
import { stringToColor } from "../../utils/stringToColor";

function stringAvatar(name) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 24,
      height: 24,
      fontSize: 10,
    },
    children: initials.toUpperCase(),
  };
}

export default function StringAvatar({ name }) {
  return <Avatar {...stringAvatar(name)} />;
}