import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { paypalSaveSubscription } from "../../api/subscriptionService";

function PayPalSubscribeButton({ planId, userId, user }) {
  const navigate = useNavigate();
  const paypalRef = useRef(null);

  useEffect(() => {
    if (!user || !userId) return;

    if (paypalRef.current.hasChildNodes()) return;

    if (window.paypal) {
      renderButton();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${
      import.meta.env.VITE_PAYPAL_CLIENT_ID
    }&vault=true&intent=subscription`;
    script.async = true;
    script.onload = renderButton;
    document.body.appendChild(script);

    function renderButton() {
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "horizontal",
            label: "subscribe",
            tagline: false,
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              plan_id: planId,
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            });
          },
          onApprove: function (data) {
            paypalSaveSubscription(data.subscriptionID)
            .then(res => console.log("Subscription saved:", res))
            .catch(err => console.error(err));
          },
        })
        .render(paypalRef.current);
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

  return <div ref={paypalRef}></div>;
}

export default PayPalSubscribeButton;
