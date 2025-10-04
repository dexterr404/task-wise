import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paypalSaveSubscription } from "../../api/subscriptionService";
import { toast } from "react-hot-toast";
import { addUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/userService";

function PayPalSubscribeButton({ planId, userId, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paypalRef = useRef(null);
  const queryClient = useQueryClient();

  const saveSubscriptionMutation = useMutation({
    mutationFn: (subscriptionId) => paypalSaveSubscription(subscriptionId),
    onSuccess: (res) => {
      toast.success("Subscription saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // refresh user
    },
    onError: (error) => {
      toast.error("Failed to save subscription");
      console.error(error);
    },
  });

  useEffect(() => {
    if (!user || !userId) return;
    if (user?.subscription?.plan === "pro" && user?.subscription?.status === "active") return;

    if (!paypalRef.current || paypalRef.current.hasChildNodes()) return;

    function renderButton() {
      if (!paypalRef.current) return;

      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "horizontal",
            label: "subscribe",
            tagline: false,
          },
          createSubscription: (data, actions) =>
            actions.subscription.create({
              plan_id: planId,
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            }),
          onApprove: (data) => {
            saveSubscriptionMutation.mutate(data.subscriptionID);
            getUser(userId).then(freshUser => {
              dispatch(addUser(freshUser));
              localStorage.setItem("user", JSON.stringify(freshUser));
            });
          },
        })
        .render(paypalRef.current);
    }

    if (window.paypal) {
      renderButton();
    } else {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${
        import.meta.env.VITE_PAYPAL_CLIENT_ID
      }&vault=true&intent=subscription`;
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);

      return () => {
        script.remove();
        if (paypalRef.current) paypalRef.current.innerHTML = ""; // cleanup
      };
    }
  }, [planId, userId, user]);

  if (!user || !userId) {
    return (
      <button
        onClick={() => navigate("/login?redirect=/")}
        className="bg-[#febd59] hover:bg-[#fbc94a] cursor-pointer text-black font-semibold px-6 py-2 rounded-md"
      >
        Subscribe
      </button>
    );
  }

  if (user?.subscription?.plan === "pro" && user?.subscription?.status === "active") {
    return (
      <button
        disabled
        className="bg-[#febd59] text-gray-800 font-semibold px-6 py-2 rounded-md opacity-60 cursor-not-allowed"
      >
        Currently subscribed
      </button>
    );
  }

  return <div ref={paypalRef}></div>;
}

export default PayPalSubscribeButton;
