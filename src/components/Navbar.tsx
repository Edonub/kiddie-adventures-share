
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import FamilyLogo from "./FamilyLogo";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`sticky top-0 z-40 w-full bg-white ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-shadow duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FamilyLogo size="sm" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <DesktopNav user={user} onSignOut={handleSignOut} />

          {/* Mobile menu button */}
          <MobileNav 
            user={user} 
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu} 
          />
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          user={user} 
          onSignOut={handleSignOut} 
        />
      </div>
    </nav>
  );
};

export default Navbar;
