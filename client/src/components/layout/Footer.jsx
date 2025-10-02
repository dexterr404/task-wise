import React from "react";
import { Twitter, GitHub, LinkedIn, Mail } from "@mui/icons-material"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Branding */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-bold text-xl">TaskWise</h2>
          <p className="text-gray-400 max-w-xs">
            Smart task management for individuals and teams. Organize, prioritize, and achieve more.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Product</h3>
            <a href="" className="hover:text-white transition">Features</a>
            <a href="" className="hover:text-white transition">Pricing</a>
            <a href="" className="hover:text-white transition">FAQ</a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Company</h3>
            <a href="" className="hover:text-white transition">About</a>
            <a href="" className="hover:text-white transition">Blog</a>
            <a href="" className="hover:text-white transition">Contact</a>
          </div>
        </div>

        {/* Social / Subscribe */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GitHub className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedIn className="w-5 h-5 hover:text-white transition" />
            </a>
          </div>
          <a
            href="mailto:support@taskwise.com"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Mail className="w-4 h-4" /> support@taskwise.com
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TaskWise. All rights reserved.
      </div>
    </footer>
  );
}
