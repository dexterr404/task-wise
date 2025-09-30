import { useEffect } from "react";

function PayPalSubscribeButton({ planId, userId }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        style: { shape: "rect", color: "silver", layout: "vertical", label: "subscribe" },
        createSubscription: function (data, actions) {
          return actions.subscription.create({ plan_id: planId });
        },
        onApprove: function (data) {
          fetch(`${import.meta.env.VITE_API_URL}/api/paypal/save-subscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, subscriptionId: data.subscriptionID }),
          });
        }
      }).render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [planId, userId]);

  return <div id="paypal-button-container"></div>;
}

export default PayPalSubscribeButton;
