import express from "express"

export const createSubscription = async(req,res) => {
    try {
        const res = await axios.post("https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
            {
                
            }
        )
    } catch (error) {
        
    }
}