import { useState } from "react";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query"
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Autorenew, Payment, Person, Settings, Tune, Close } from "@mui/icons-material";
import { getCurrentUser } from "../../api/authService";
import { toast, Toaster } from "react-hot-toast"
import { getBillingDetails, paypalCancelSubscription } from "../../api/subscriptionService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/userService";
import { addUser } from "./userSlice";
import { getTeams } from "../../api/teamService";
import { isProActive } from "../../utils/isProActive";

import Account from "../settings/Account";
import Personalization from "../settings/Personalization";
import Subscription from "../settings/Subscription";
import Billing from "../settings/Billing";

function SettingsModal({ open, onClose }) {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [section, setSection] = useState("account");

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: open,
  });

  const proActive = isProActive(data?.subscription);

  const { data:teams } = useQuery({
    queryKey: ["getTeams"],
    queryFn: () => getTeams(),
    enabled: open
  })

  const { data:billing } = useQuery({
    queryKey: ["billingDetails"],
    queryFn: () => getBillingDetails(),
    enabled: open,
  });

  const cancelMutation = useMutation({
    mutationFn: () => paypalCancelSubscription(data?.subscription?.paypalSubscriptionId),
    onSuccess: async() => {
      toast.success("Subscription successfully canceled");
      const updatedUser = await getUser(user.id);
      dispatch(addUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) => {
      console.error("Failed to cancel subscription", error);
      toast.error("Failed to cancel subscription");
    },
  });


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: "16px", overflow: "hidden", minHeight: "80vh", maxHeight: "80vh", bgcolor: "var(--color-surface)",width: { xs: "100%", sm: "auto" },m: { xs: 1, sm: "auto" } },
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center gap-1 relative text-text-primary bg-bg px-4 py-3">
        <Settings fontSize="small" />
        <span className="font-semibold text-md">Settings</span>
        <div className="absolute right-2 top-2">
          <IconButton onClick={onClose} size="small" sx={{ py: 0.5}}>
            <Close sx={{ width: "18px", color: "var(--color-text-primary)" }} />
          </IconButton>
        </div>
      </div>
      <DialogContent sx={{ display: "flex", gap: {xs:0 ,sm:2}, py: 1, pr: 1, pl: { xs:1, sm:2}, flexDirection: { xs: "column", sm: "row"}}}>
        <section className="flex flex-col">
          <ul className="text-text-primary text-sm flex flex-col pt-2 max-sm:flex-row">
            <li onClick={() => setSection("account")} className={`flex items-center gap-0.5 ${section === "account" && "bg-accent"} hover:bg-accent py-2 px-4 rounded-lg cursor-pointer`}><Person fontSize="small"/>  <span className="max-md:hidden">Account</span></li>
            <li onClick={() => setSection("personalization")} className={`flex items-center gap-0.5 ${section === "personalization" && "bg-accent"} hover:bg-accent py-2 px-4 rounded-lg cursor-pointer`}><Tune fontSize="small"/> <span className="max-md:hidden">Personalization</span></li>
            <li onClick={() => setSection("subscription")} className={`flex items-center gap-0.5 ${section === "subscription" && "bg-accent"} hover:bg-accent py-2 px-4 rounded-lg cursor-pointer`}><Autorenew fontSize="small"/> <span className="max-md:hidden">Subscription</span></li>
            <li onClick={() => setSection("billing")} className={`flex items-center gap-0.5 ${section === "billing" && "bg-accent"} hover:bg-accent py-2 px-4 rounded-lg cursor-pointer`}><Payment fontSize="small"/> <span className="max-md:hidden">Billing and Payments</span></li>
          </ul>
        </section>
        <section className="flex-1">
          {
            section === "account" && <Account />
          }
          {
            section === "personalization" && <Personalization />
          }
          {
            section === "subscription" && <Subscription teams={teams} data={data} onCancel={() => cancelMutation.mutateAsync()} isLoading={cancelMutation.isLoading} proActive={proActive}/>
          }
          {
            section === "billing" && <Billing billingData={billing}/>
          }
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal
