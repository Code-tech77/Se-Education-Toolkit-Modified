"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Github, Mail, Twitter, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Labs", href: "/labs" },
    { name: "Talks", href: "/talks" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: <Github size={18} />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <Twitter size={18} />,
    },
    {
      name: "Email",
      href: "mailto:info@se-toolkit.com",
      icon: <Mail size={18} />,
    },
  ];

  return (
    <footer className="w-full bg-navy-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Grid decorative overlay */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-5 lg:col-span-4 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-extrabold text-white tracking-tight uppercase">
                SE TOOLKIT
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Transforming software engineering education with AI-powered interactive learning experiences. Open source and built for classrooms.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3 lg:col-span-4 space-y-6"
          >
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-accent-sky text-sm transition-colors flex items-center gap-1.5 group w-fit"
                  >
                    <span className="relative font-medium">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-accent-sky transition-all group-hover:w-full"></span>
                    </span>
                    <ExternalLink
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-4 space-y-6"
          >
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs">Connect</h4>
            <div className="flex gap-3.5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-navy-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 shadow-md"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {currentYear} SE Toolkit. All rights reserved. Developed at Brunel University London.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
