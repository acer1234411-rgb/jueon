import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, Menu, X, ArrowUp, Wrench, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PHONE_NUMBER, COMPANY_NAME } from "../../constants";
import Button from "../ui/Button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "소개", href: "/#about" },
    { name: "서비스", href: "/#services" },
    { name: "유품/빈집정리", href: "/#specialized" },
    { name: "이용후기", href: "/#testimonials" },
    { name: "문의하기", href: "/#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm py-3"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white group-hover:bg-secondary transition-colors">
            <Wrench size={24} className="rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-text-main font-medium hover:text-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/inquiry-check"
            className="flex items-center gap-1.5 text-text-main font-medium hover:text-secondary transition-colors"
          >
            <Search size={15} />
            내 문의 확인
          </Link>
          <a href={`tel:${PHONE_NUMBER}`}>
            <Button variant="secondary" className="py-2 px-4 text-sm">
              <Phone size={16} />
              {PHONE_NUMBER}
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden"
        >
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-text-main font-medium py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/inquiry-check"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-text-main font-medium py-2 border-b border-gray-100"
            >
              <Search size={16} className="text-secondary" />
              내 문의 확인
            </Link>
            <button 
              onClick={scrollToTop}
              className="text-secondary font-bold py-2 border-b border-gray-100 flex items-center gap-2"
            >
              <ArrowUp size={18} />
              맨 위로 이동
            </button>
            <a href={`tel:${PHONE_NUMBER}`} className="w-full">
              <Button variant="secondary" className="w-full">
                <Phone size={18} />
                {PHONE_NUMBER}
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
