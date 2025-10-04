import { motion } from "framer-motion";
import { CheckCircle,BarChart,AccessTime,Insights,Chat,Groups } from "@mui/icons-material";


const features = [
  {
    icon: <CheckCircle className="w-8 h-8 text-yellow-400" />,
    title: "Stay Organized",
    description: "Easily manage all your tasks in one place with smart lists and filters."
  },
  {
    icon: <BarChart className="w-8 h-8 text-yellow-400" />,
    title: "Track Progress",
    description: "Visual dashboards help you monitor productivity and hit your goals faster."
  },
  {
    icon: <AccessTime className="w-8 h-8 text-yellow-400" />,
    title: "Save Time",
    description: "Automated reminders and prioritization keep you focused on what matters."
  },
   {
    icon: <Insights className="w-8 h-8 text-yellow-400" />,
    title: "AI-Powered Insights",
    description: "Get smart recommendations on prioritization and workflow improvements to maximize efficiency."
  },
  {
    icon: <Groups className="w-8 h-8 text-yellow-400" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with shared boards, roles, and real-time task syncing."
  },
  {
    icon: <Chat className="w-8 h-8 text-yellow-400" />,
    title: "Task Comments & Media",
    description: "Leave feedback, attach images, and keep conversations directly tied to each task."
  }
];

export default function FeaturesSection() {
  return (
    <section className="relative min-h-screen snap-start bg-gray-50 text-gray-800 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-[clamp(1.5rem,3vw,2rem)] font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose TaskWise?
        </motion.h2>
        <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] text-gray-600">
          Everything you need to plan smarter and achieve more.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <div className="flex justify-center md:justify-start">{feature.icon}</div>
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
