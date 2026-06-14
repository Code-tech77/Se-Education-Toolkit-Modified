"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Personas", href: "/#personas" },
  { name: "Labs", href: "/labs" },
  { name: "Assessment", href: "/assessment" },
  { name: "About", href: "/about" },
  { name: "Talks", href: "/talks" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) {
      return pathname === "/" && typeof window !== "undefined" && window.location.hash === href.substring(1);
    }
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "glass shadow-premium py-3 bg-white/80"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-premium border border-navy-900/10 bg-white flex items-center justify-center">
            <Image
              src="https://bruneltalentmarketplace.com/static/media/Navbar-icon.9b1893f0b90313489b9f.png"
              alt="Spiral Logo"
              fill
              className="object-cover p-1"
            />
          </div>
          <span className="flex items-center text-navy-900">
            <span className="text-xl mr-1.5">🚀</span>
            <span className="hidden sm:inline font-extrabold tracking-tight text-base md:text-lg">
              SE EDUCATION TOOLKIT
            </span>
            <span className="sm:hidden font-extrabold tracking-tight text-sm">
              SE TOOLKIT
            </span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul
            className="flex items-center space-x-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.name} className="relative">
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 block z-10 ${active
                      ? "text-accent-blue"
                      : "text-navy-700 hover:text-navy-900"
                      }`}
                    onMouseEnter={() => setHoveredLink(link.name)}
                  >
                    {link.name}
                  </Link>

                  {/* Sliding Hover Indicator */}
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-navy-900/5 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}

                  {/* Active Dot/Line */}
                  {active && (
                    <motion.div
                      layoutId="active-nav-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-blue rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-navy-900/5 text-navy-900 focus:outline-none transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-dark absolute left-0 top-full w-full shadow-2xl border-t border-white/10 overflow-hidden bg-navy-900/95"
          >
            <ul className="flex flex-col text-white font-semibold py-6 px-6 space-y-4">
              {navLinks.map((link, idx) => {
                const active = isLinkActive(link.href);
                return (
                  <motion.li
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-lg py-2 transition-colors ${active ? "text-accent-light" : "text-slate-300 hover:text-white"
                        }`}
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;