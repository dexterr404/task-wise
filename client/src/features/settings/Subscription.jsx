import { useState } from "react";
import CancelSubscriptionModal from "../user/CancelSubscriptionModal";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBillingDetails } from "../../api/subscriptionService";

export function Subscription({data,onCancel,isLoading}) {
    const navigate = useNavigate();
    const [isCancel, setIsCancel] = useState(false);
    
    return<section className="bg-bg rounded-2xl h-full p-6 shadow-md sm:w-100 lg:w-120">
        <div className="flex flex-col h-full gap-14 justify-between">
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold text-text-primary">Subscription</h1>
                {
                    data?.subscription?.status === "active" && data?.subscription?.plan === "pro" &&
                    <button
                    onClick={() => setIsCancel(true)}
                    className="px-3 py-1 bg-blue-600 cursor-pointer text-white text-sm rounded-lg hover:bg-blue-700">
                    Cancel Plan
                    </button>
                }
            </div>
            <CancelSubscriptionModal isLoading={isLoading} onCancel={onCancel} open={isCancel} onClose={() => setIsCancel(false)}/>

            {/* Current Plan */}
            <div className="mb-6">
                <p className="text-sm text-text-secondary">Current Plan</p>
                <p className="text-lg font-medium text-text-primary capitalize">{data?.subscription.plan || "Free"}</p>
                <p className="text-xs text-text-secondary">
                Next renewal: {
                    data?.subscription?.plan === "free"
                    ? "N/A"
                    : data?.subscription?.nextBillingDate
                        ? new Date(data.subscription.nextBillingDate).toLocaleDateString()
                        : "Not available"
                }
                </p>
            </div>

            {/* Usage Stats */}
            <div className="space-y-4 mb-6">
                <div>
                <p className="text-sm font-medium text-text-secondary">
                    Tasks <span className="text-xs text-text-secondary">(2,350 / 5,000)</span>
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-blue-600 h-2 rounded-full w-[47%]" />
                </div>
                </div>
                <div>
                <p className="text-sm font-medium text-text-secondary">
                    Team Members <span className="text-xs text-text-secondary">(18 / 25)</span>
                </p>
                </div>
            </div>
        </div>

      {/* Upgrade Options */}
      <div className="flex max-sm:flex-col gap-3">
        {(data?.subscription?.plan !== "pro" || data?.subscription?.status !== "active") && (
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white cursor-pointer text-sm rounded-lg hover:bg-blue-700">
                Upgrade Plan
            </button>
        )}
        <button 
        onClick={() => navigate("/?section=pricing")}
        className="flex-1 px-3 py-2 border bg-surface text-text-secondary cursor-pointer border-border text-sm rounded-lg hover:bg-accent">
          Compare Plans
        </button>
      </div>
    </div>
    </section>
}

export default Subscription