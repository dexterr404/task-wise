import { useState } from "react";
import CancelSubscriptionModal from "../user/CancelSubscriptionModal";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBillingDetails } from "../../api/subscriptionService";

export function Subscription({data,onCancel,isLoading,teams,proActive}) {
    const navigate = useNavigate();
    const [isCancel, setIsCancel] = useState(false);
    const maxTeams = proActive ? Infinity : 3;
    const teamCount = teams?.length || 0;
    
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
                <div className="text-sm">
                {proActive ? (
                    <p className="text-green-600 font-medium">
                    Pro plan active until {new Date(data?.subscription?.nextBillingDate).toLocaleDateString()}
                    </p>
                ) : (
                    <p className="text-text-secondary">Free plan</p>
                )}
                </div>
                <p className="text-xs text-text-secondary">
                Next renewal: {
                    data?.subscription?.status === "active"
                    ? data?.subscription?.nextBillingDate
                        ? new Date(data.subscription.nextBillingDate).toLocaleDateString()
                        : "Not available"
                    : "N/A"
                }
                </p>
            </div>

            {/* Usage Stats */}
            <div className="space-y-4 mb-6">
                <div>
                <p className="text-sm font-medium text-text-secondary">
                Teams{" "}
                <span className="text-xs text-text-secondary">
                    {proActive ? "Unlimited" : `${teamCount}/${maxTeams}`}
                </span>
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                    width: proActive ? "0%" : `${Math.min((teamCount / maxTeams) * 100, 100)}%`,
                    }}
                />
                </div>
                </div>
            </div>
        </div>

      {/* Upgrade Options */}
      <div className="flex max-sm:flex-col gap-3">
        {(data?.subscription?.plan !== "pro" || data?.subscription?.status !== "active") && (
            <button
            onClick={() => navigate("/?section=pricing")}
            className="flex-1 px-3 py-2 bg-blue-600 text-white cursor-pointer text-sm rounded-lg hover:bg-blue-700">
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