import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { demo } from "../../data/card";

import StaticTaskCard from "../ui/StaticCard";

export default function HomeSection({user}) {
    const navigate = useNavigate();

    return<div className="flex flex-col md:flex-row max-md:pt-25 items-center justify-between px-6 py-10 md:py-20 gap-8 max-md:h-[calc(100vh+144px)] max-md:pb-40 relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
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
}