import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { demo } from "../data/card";
import { useEffect,useState } from "react";
import { getCurrentUser } from "../api/authService";
import { useQuery } from "@tanstack/react-query";

import Logo from "../assets/taskwise.svg";
import StaticTaskCard from "../components/ui/StaticCard";
import PricingSection from "../components/website/PricingSection";
import ContactSection from "../components/website/ContactSection";
import FeaturesSection from "../components/website/FeaturesSection";
import ChatBot from "../components/ui/ChatBot";
import Footer from "../components/layout/Footer";
import WebsiteNavBar from "../components/layout/WebsiteNavBar";
import HomeSection from "../components/website/HomeSection";

export function Landing() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
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
      { threshold: 0.1 }
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
    <main className=" h-screen overflow-y-scroll overflow-x-hidden scrollbar-auto-hide">
        <WebsiteNavBar activeSection={activeSection} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setActiveSection={setActiveSection} user={user} scrollTo={scrollTo}/>
        <section id="home">
            <HomeSection user={user} />
        </section>
        <section id="features">
            <FeaturesSection />
        </section>
        <section id="pricing">
            <PricingSection user={user} />
        </section>
        <section id="support">
            <ContactSection />
        </section>
        <section>
            <Footer />
        </section>
        <ChatBot />
    </main>
    
  );
}

export default Landing;
