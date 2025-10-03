import axios from "axios";

export async function paypalSaveSubscription(subscriptionId) {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/payment/paypal/save-subscription`,
      { subscriptionId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Failed to save PayPal subscription:", error.response || error);
    throw error;
  }
}

export async function paypalCancelSubscription(subscriptionId) {
  const token = localStorage.getItem("token");
  try{
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/payment/paypal/cancel-subscription`,
      {subscriptionId},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    )
    
    return res.data;
  } catch (error) {
    console.error("Failed to cancel Paypal subscription:", error.response || error);
    throw error;
  }
}

export async function getBillingDetails() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment/billing`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return res.data
}

