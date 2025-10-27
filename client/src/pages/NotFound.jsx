import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center px-6 py-10 gap-8 min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white relative overflow-hidden">
            {/* Floating background elements */}
            <motion.div
                className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
                animate={{
                    y: [0, 30, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Content */}
            <motion.div 
                className="flex flex-col gap-6 items-center text-center z-10 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* 404 Number with animated cards */}
                <div className="relative mb-4">
                    <motion.h1
                        className="font-bold text-[clamp(8rem,20vw,12rem)] leading-none opacity-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        404
                    </motion.h1>
                    
                    {/* Floating task cards around 404 */}
                    <motion.div
                        className="absolute top-0 left-0 bg-white/20 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/30"
                        initial={{ opacity: 0, x: -50, rotate: -15 }}
                        animate={{ opacity: 1, x: 0, rotate: -12 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        whileHover={{ scale: 1.05, rotate: -8 }}
                    >
                        <div className="w-12 h-12 bg-red-400/50 rounded-md" />
                    </motion.div>

                    <motion.div
                        className="absolute top-10 right-0 bg-white/20 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/30"
                        initial={{ opacity: 0, x: 50, rotate: 15 }}
                        animate={{ opacity: 1, x: 0, rotate: 12 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        whileHover={{ scale: 1.05, rotate: 8 }}
                    >
                        <div className="w-12 h-12 bg-blue-400/50 rounded-md" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/30"
                        initial={{ opacity: 0, y: 50, rotate: 5 }}
                        animate={{ opacity: 1, y: 0, rotate: 3 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        whileHover={{ scale: 1.05, rotate: 0 }}
                    >
                        <div className="w-12 h-12 bg-yellow-400/50 rounded-md" />
                    </motion.div>
                </div>

                <motion.h2
                    className="font-bold text-[clamp(2rem,5vw,3rem)] leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Oops! Page Not Found 🔍
                </motion.h2>
                
                <motion.p
                    className="text-[clamp(1rem,2vw,1.25rem)] max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Looks like this task got lost in the shuffle. The page you're looking for doesn't exist or has been moved to a different board.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <motion.button
                        onClick={() => navigate("/")}
                        className="bg-[#febd59] px-6 py-3 rounded-md border border-white text-gray-900 text-sm md:text-base font-semibold cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Go to Homepage
                    </motion.button>

                    <motion.button
                        onClick={() => navigate(-1)}
                        className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md border border-white text-white text-sm md:text-base font-semibold cursor-pointer"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Go Back
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Decorative elements at bottom */}
            <motion.div
                className="absolute bottom-10 flex gap-3 opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.9, duration: 1 }}
            >
                <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
            </motion.div>
        </div>
    )
}
