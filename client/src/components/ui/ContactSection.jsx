import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [value, setValue] = useState("");

  return (
    <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white snap-start flex flex-col lg:flex-row items-start justify-between gap-8 px-8 py-40 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-60 h-60 bg-purple-400/20 rounded-full blur-2xl"></div>

      {/* Info Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="flex flex-col self-start gap-14 flex-3 z-10"
      >
        <div className="flex gap-1 flex-col">
          <h1 className="font-extrabold text-[clamp(2rem,5vw,3rem)]">
            Contact Us
          </h1>
          <span>
            Email, call, or complete the form to learn how TaskWise can solve
            your messaging problem.
          </span>
          <span className="font-medium">📧 taskwise@info.io</span>
          <span className="font-medium">📞 321-221-231</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col max-w-sm">
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-sm opacity-90">
              Our support team is available around the clock to address any
              concerns or queries you may have.
            </p>
          </div>
          <div className="flex flex-col max-w-sm">
            <h3 className="font-semibold">Feedback & Suggestions</h3>
            <p className="text-sm opacity-90">
              We value your feedback and are continuously working to improve
              TaskWise. Your input shapes the future of TaskWise.
            </p>
          </div>
          <div className="flex flex-col max-w-sm">
            <h3 className="font-semibold">Media Inquiries</h3>
            <p className="text-sm opacity-90">
              For media-related questions or press inquiries, please contact us
              at <span className="underline">media@taskwiseapp.com</span>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, type: "spring" }}
        viewport={{ once: true }}
        className="flex flex-col rounded-2xl bg-white/80 backdrop-blur-md text-gray-900 p-8 shadow-xl w-full max-w-lg z-10"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Get in Touch</h1>
        <span className="text-sm text-gray-600 mb-6">You can reach us anytime</span>

        {/* Name Fields */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            className="rounded-lg border border-gray-300 px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
          />
          <input
            type="text"
            placeholder="Last name"
            className="rounded-lg border border-gray-300 px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Your email"
          className="rounded-lg border border-gray-300 px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
        />

        {/* Textarea */}
        <div className="relative">
          <textarea
            placeholder="How can we help?"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            maxLength={100}
            rows={5}
            className="rounded-lg border border-gray-300 px-4 py-2 w-full mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
          ></textarea>
          <span className="absolute bottom-3 right-5 text-xs text-gray-500 mb-4">
            {value.length}/100
          </span>
        </div>
        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded-xl font-semibold shadow-md"
        >
          Submit
        </motion.button>

        {/* Terms */}
        <span className="text-xs text-gray-500 mt-4">
          By contacting us, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </span>
      </motion.div>
    </section>
  );
}
