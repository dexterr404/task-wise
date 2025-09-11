import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

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