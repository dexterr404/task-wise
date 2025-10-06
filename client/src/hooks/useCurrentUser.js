import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/authService";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });
}
