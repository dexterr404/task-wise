import { Inbox } from "@mui/icons-material"
import { Card, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getTeamInbox } from "../../api/teamInboxService"
import { teamInboxIconMap } from "../../utils/teamInboxIconMap"
import { teamInboxIconColorMap } from "../../utils/teamInboxIconMap"
import SearchTeamInbox from "./SearchTeamInbox"
import { useState } from "react"
import InboxTypeMenu from "./InboxTypeMenu"
import TeamInboxSkeleton from "../skeleton/TeamInboxSkeleton"


export function TeamInbox({ team }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["teamInbox", team._id,searchQuery],
    queryFn: () => getTeamInbox(team._id,searchQuery),
  })

  if (isLoading) return <div className="flex w-full h-dvh"><TeamInboxSkeleton /></div>
  if (error) return <p>Failed to load inbox</p>

  return (
    <main className="w-full p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 text-gray-500">
        <div className="flex items-center flex-1">
          <Inbox fontSize="small" />
          <span className="max-sm:hidden">Team Inbox</span>
        </div>
        <div className="flex items-center flex-4 justify-end">
          <InboxTypeMenu />
          <SearchTeamInbox
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {data && data.length > 0 ? (
        data.map((i) => {
          const Icon = teamInboxIconMap[i.title] || teamInboxIconMap.system;
          const color =
            teamInboxIconColorMap[i.title] || teamInboxIconColorMap.system;

          return (
            <div
              key={i._id}
              className={`relative border-l-4 pl-4 py-3 bg-white cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transform transition-transform ease-in-out duration-100 shadow-md p-4 rounded-md ${
                i.type === "task"
                  ? "border-blue-700"
                  : i.type === "member"
                  ? "border-green-700"
                  : "border-orange-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={i.author.profileImage}
                  className="w-6 h-6 rounded-full border border-gray-200 object-cover"
                  alt={i.author.name}
                />
                <div className="flex flex-col">
                  <Typography
                    variant="body2"
                    className="text-gray-500"
                    dangerouslySetInnerHTML={{ __html: i.description }}
                  />
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Icon fontSize="small" className={`${color}`} />
                    <span>{new Date(i.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            textAlign: "center",
            py: 4,
          }}
        >
          No inbox content yet.
        </Typography>
      )}
    </main>
  );
}

export default TeamInbox
