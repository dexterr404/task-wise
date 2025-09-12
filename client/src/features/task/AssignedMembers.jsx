import { Chip,Avatar } from "@mui/material";

export default function AssignedMembers({ assigned, onRemove }) {
  return (
    <div className="flex flex-wrap gap-2 p-1 my-3">
      {assigned?.map((member) => (
        <Chip
          key={member._id}
          label={member.name}
          avatar={<Avatar src={member.profileImage} alt={member.name} />}
          onDelete={() => onRemove(member._id)}
          variant="outlined"
        />
      ))}
    </div>
  );
}
