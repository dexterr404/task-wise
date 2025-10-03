import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { demo } from "../data/card";
import { Menu, Person } from "@mui/icons-material";
import { useEffect,useState } from "react";
import { getCurrentUser } from "../api/authService";
import { useQuery } from "@tanstack/react-query";

import Logo from "../assets/taskwise.svg";
import StaticTaskCard from "../components/ui/StaticCard";
import PricingPlans from "../components/payments/PricingPlans";
import ContactSection from "../components/ui/ContactSection";
import FeaturesSection from "../components/ui/FeaturesSection";
import ChatBot from "../components/ui/ChatBot";
import Footer from "../components/layout/Footer";



export function Landing() {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const {data: user,} = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      scrollTo(section);
    }
  }, [location]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden scrollbar-auto-hide">
        <nav className="sticky top-0 left-0 w-full z-50 flex justify-between px-14 py-2 items-center bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-0.5">
                <img src={Logo} alt="Logo" className="size-10" />
                <span className="text-gray-900 font-semibold">TaskWise</span>
            </div>
            <ul className="hidden md:flex gap-8">
                <li onClick={() => scrollTo("home")} 
                className={`cursor-pointer ${activeSection === "home" ? "text-blue-500 font-semibold" : ""}`}>
                Home
                </li>
                <li onClick={() => scrollTo("features")} 
                className={`cursor-pointer ${activeSection === "features" ? "text-blue-500 font-semibold" : ""}`}>
                Features
                </li>
                <li onClick={() => scrollTo("pricing")} 
                className={`cursor-pointer ${activeSection === "pricing" ? "text-blue-500 font-semibold" : ""}`}>
                Pricing
                </li>
                <li onClick={() => scrollTo("support")} 
                className={`cursor-pointer ${activeSection === "support" ? "text-blue-500 font-semibold" : ""}`}>
                Support
                </li>
            </ul>
            <div className="hidden md:flex items-center gap-3 text-sm">
               {user ? (
                <Person fontSize="small" className="cursor-pointer" />
                ) : (
                <div
                    onClick={() => navigate("/login?redirect=/")}
                    className="cursor-pointer hover:opacity-70"
                >
                    Sign in
                </div>
                )}
                <motion.button
                onClick={() => navigate(user ? "/dashboard" : "/login")}
                whileHover={{ backgroundColor: "#4f46e5", scale: 1.03 }}
                className="px-4 py-1 bg-indigo-600 text-white rounded-lg cursor-pointer font-medium"
                >
                Launch app
                </motion.button>
            </div>
            <div className="block md:hidden">
                <Menu fontSize="small" />
            </div>
        </nav>

        <section id="home" className="relative min-h-screen snap-start">
            <div className="flex flex-col md:flex-row max-md:pt-25 items-center justify-between px-6 py-10 md:py-20 gap-8 max-md:h-[calc(100vh+144px)] max-md:pb-40 h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">

                {/* Text Section */}
                <motion.div 
                    className="flex flex-col gap-6 md:w-1/2 px-4 items-center md:items-start text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                    className="font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    >
                    Plan Smarter. Achieve Wiser.🚀
                    </motion.h1>
                    
                    <motion.p
                    className="text-[clamp(1rem,2vw,1.25rem)] max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    >
                    TaskWise helps you organize, prioritize, and conquer your day with effortless clarity. From personal goals to team projects, get insights and actionable steps to stay ahead — work smarter, not harder.
                    </motion.p>

                    <motion.button
                    onClick={() => navigate(user ? "/dashboard" : "/login")}
                    className="bg-[#febd59] px-6 py-3 md:px-5 md:py-2 rounded-md border border-white text-gray-900 text-sm md:text-base font-semibold cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    >
                    Try for free!
                    </motion.button>
                </motion.div>

                {/* Task Cards Section */}
                <div className="relative w-full flex-1 flex justify-center items-center">
                {/* Bottom card (shadow behind) */}
               
                <div className="relative">
                                    {/* Top card */}
                <motion.div 
                    className="relative z-20 shadow-3xl rotate-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 200 }}
                >
                    <StaticTaskCard demo={demo.demo2}/>
                </motion.div>

                 <motion.div 
                    className="absolute z-10 shadow-2xl top-1 right-8 -rotate-15"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <StaticTaskCard demo={demo.demo1}/>
                </motion.div>
                </div>
                </div>
            </div>
        </section>
        <section id="features" className="snap-start">
            <FeaturesSection />
        </section>
        <section id="pricing" className="snap-start">
            <PricingPlans user={user} />
        </section>
        <ChatBot />
        <section id="support" className="snap-start">
            <ContactSection />
        </section>
        <section className="snap-start">
            <Footer />
        </section>
    </main>
    
  );
}

export default Landing;
