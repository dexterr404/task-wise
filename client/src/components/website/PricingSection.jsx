import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import PayPalSubscribeButton from "../payments/PaypalSubscribeButton";


export default function PricingSection({user}) {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Free",
      price: "$0/month",
      features: [
        "Basic Task Management – Create, edit, and track personal and team tasks",
        "Visual Dashboard – Get a clear overview of tasks, progress, and deadlines",
        "Unlimited Tasks but Limited Teams – Organize simple projects or workflows",
        "AI Insights – Longer duration between requests",
      ],
      cta: "Get for free",
    },
    {
      title: "Pro",
      price: "$4.99/month",
      features: [
        "Basic Task Management – Create, edit, and track personal and team tasks",
        "Visual Dashboard – Get a clear overview of tasks, progress, and deadlines",
        "Unlimited Tasks & Teams – Scale up without limits",
        "AI Insights – Shorter duration between requests",
        "AI Assistant – Get task guidance and suggestions from your AI assistant",
      ],
      cta: "Purchase",
    },
  ];

  return (
    <section className="relative bg-gray-100 py-20 min-h-screen snap-start flex flex-col gap-6">
      {/* Floating abstract shapes */}
      <div className="absolute top-32 left-32 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 right-40 w-[28rem] h-[28rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-pulse"></div>
      <div className="absolute top-1 right-5 w-[17rem] h-[17rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-pulse"></div>


      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center px-6 z-10 relative">
        <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-900 leading-tight">
          Pricing Plans
        </h1>
        <p className="text-[clamp(1rem,1.5vw,1.2rem)] max-w-xl text-gray-700 mt-2">
          Choose the plan that fits you and your team best. Organize smarter, collaborate better, and achieve more with TaskWise.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row w-full gap-8 justify-center px-6 max-w-6xl mx-auto relative z-10">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            className={`bg-white/50 backdrop-blur-md border border-white/20 shadow-xl flex flex-col gap-8 justify-between p-6 rounded-2xl text-gray-900 hover:scale-105 transition-transform duration-300 w-full md:w-80`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-4">
                <div className="text-2xl font-semibold">{plan.title}</div>
                <div className="text-xl font-medium">{plan.price}</div>
              </div>
              <ul className="flex flex-col gap-2 mb-4 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircleOutline sx={{ fontSize: 18, color: "#facc15" }} />
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="text-xs opacity-80">
                {plan.title === "Free"
                  ? "Start organizing your day instantly — no credit card required!"
                  : "Unlock your team’s full potential — smarter, faster, organized!"}
              </span>
            </div>
            {
              plan.title === "Pro" ? (
                <PayPalSubscribeButton planId={"P-7TC84785A47398338NDNKOZQ"} user={user} userId={user?._id}/>
              ) : (
              <motion.button
              onClick={() => navigate(user || user?._id ? "/dashboard" : "/login?redirect=/")}
              className="bg-[#febd59] hover:bg-[#fbc94a] px-6 py-3 md:px-5 md:py-2 rounded-md border border-white text-gray-900 text-sm md:text-base font-semibold cursor-pointer"
            >
              {plan.cta}
            </motion.button> 
              )
            }
          </motion.div>
        ))}
      </div>
    </section>
  );
}
