import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Download, Cpu, ChevronRight, Battery, Radio, Activity, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile overlay when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle phone back button to close the menu
  useEffect(() => {
    if (isOpen) {
      const pathOnOpen = location.pathname;
      window.history.pushState({ menuOpen: true }, '');

      const handlePopState = (e) => {
        setIsOpen(false);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        // Only trigger back if the user hasn't already navigated to a new route
        if (location.pathname === pathOnOpen && window.history.state && window.history.state.menuOpen) {
          window.history.back();
        }
      };
    }
  }, [isOpen, location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hardware', path: '/hardware' },
    { name: 'Software', path: '/software' },
    { name: 'Results', path: '/results' },
    { name: 'Resources & FAQs', path: '/resources' },
  ];

  return (
    <>
      {/* Floating Capsule Header Container */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 max-w-6xl mx-auto w-full">
        <nav className="relative backdrop-blur-xl bg-[#080808]/75 border border-[#1A1A1A] rounded-2xl md:rounded-full px-6 py-3 flex justify-between items-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300">
          
          {/* Subtle neon accent strip inside navbar */}
          <div className="absolute bottom-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#E67E22]/40 to-transparent"></div>

          {/* Logo with futuristic spinning scanner ring */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative w-9 h-9 rounded-full border border-[#E67E22]/30 overflow-hidden flex items-center justify-center p-[2px] bg-black">
              {/* Spinning outer radar segment */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-t-[#E67E22] border-r-[#E67E22]/20 border-b-transparent border-l-transparent animate-spin" 
                style={{ animationDuration: '3s' }}
              ></div>
              <img src="/assets/images/logo.jpg" alt="Chirang Polytechnic Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-orbitron font-black text-sm md:text-base tracking-widest text-white leading-none group-hover:text-[#E67E22] transition-colors">
                Robo<span className="text-[#E67E22]">Nex</span>
              </span>
              <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest leading-none mt-1">
                CP Dept. of EE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `font-orbitron font-bold text-[10px] lg:text-xs uppercase tracking-wider transition-all duration-300 relative py-2 ${
                    isActive ? 'text-[#E67E22]' : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator" 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E67E22] rounded-full shadow-[0_0_8px_#E67E22]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            
            <Link 
              to="/resources#download" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-orbitron font-black px-4 py-2 bg-gradient-to-r from-[#E67E22]/10 to-[#E67E22]/20 text-[#E67E22] rounded-full border border-[#E67E22]/30 hover:from-[#E67E22] hover:to-orange-400 hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(230,126,34,0.3)] transition-all duration-300 ml-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download App
            </Link>
          </div>

          {/* Custom Animated Morphing Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl bg-[#111]/90 border border-[#222] text-zinc-400 hover:text-[#E67E22] active:scale-95 transition-all z-50 relative overflow-hidden group shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col justify-between w-4.5 h-3.5 transform transition-all duration-300">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="h-[1.5px] w-full rounded bg-current origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="h-[1.5px] w-full rounded bg-current"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="h-[1.5px] w-full rounded bg-current origin-center"
              />
            </div>
          </button>

        </nav>
      </header>

      {/* Futuristic Full-Screen Immersive Holographic Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#080808]/98 backdrop-blur-2xl z-45 md:hidden flex flex-col justify-between p-6 pb-8 pt-6 overflow-y-auto"
          >
            {/* Ambient cyber grid texture */}
            <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none"></div>
            {/* Sweep scanner line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E67E22]/3 to-transparent h-1/2 w-full pointer-events-none animate-scan"></div>

            {/* Menu Sections Container */}
            <div className="flex flex-col gap-6 relative z-10">
              
              {/* Mobile Overlay Header with branding and Close Button */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full border border-[#E67E22]/30 overflow-hidden flex items-center justify-center p-[2px] bg-black">
                    <div className="absolute inset-0 rounded-full border border-t-[#E67E22] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
                    <img src="/assets/images/logo.jpg" alt="Chirang Polytechnic Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-orbitron font-black text-sm tracking-wider text-white leading-none">
                      Robo<span className="text-[#E67E22]">Nex</span>
                    </span>
                    <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest leading-none mt-0.5">
                      CP Dept. of EE
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-[#111]/90 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Navigation Section Indicator */}
              <div className="text-[9px] font-mono text-[#E67E22] tracking-widest uppercase border-b border-zinc-800/50 pb-2 flex items-center gap-1.5 justify-between">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#E67E22] animate-pulse" /> 
                  <span>NAVIGATION CORE // CONNECTED</span>
                </div>
                <span className="text-zinc-600">VER_1.0.4</span>
              </div>

              {/* Staggered Navigation Links */}
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => 
                        `font-orbitron font-bold text-base tracking-widest uppercase flex items-center justify-between py-2.5 px-4 rounded-xl transition-all border ${
                          isActive 
                            ? 'bg-[#E67E22]/10 border-[#E67E22]/30 text-[#E67E22] shadow-[0_0_15px_rgba(230,126,34,0.15)]' 
                            : 'text-zinc-400 hover:text-white border-transparent'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#E67E22]/60">0{idx + 1}</span>
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#E67E22]/60" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Futuristic Diagnostics Dashboard Section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-[#111]/90 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 font-mono shadow-inner"
              >
                <div className="text-[8px] font-orbitron font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-1.5 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#E67E22]" /> Robot Diagnostics Panel
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
                  <div className="bg-black/55 p-2 rounded border border-zinc-900 flex flex-col gap-0.5">
                    <span className="text-[8px] text-zinc-600 uppercase font-orbitron">Cores & Clock</span>
                    <span className="text-white flex items-center gap-1 font-bold">
                      <Cpu className="w-3 h-3 text-[#E67E22]" /> ATmega328P
                    </span>
                  </div>
                  <div className="bg-black/55 p-2 rounded border border-zinc-900 flex flex-col gap-0.5">
                    <span className="text-[8px] text-zinc-600 uppercase font-orbitron">Power Rails</span>
                    <span className="text-white flex items-center gap-1 font-bold">
                      <Battery className="w-3 h-3 text-emerald-400" /> 7.4V (78%)
                    </span>
                  </div>
                  <div className="bg-black/55 p-2 rounded border border-zinc-900 flex flex-col gap-0.5">
                    <span className="text-[8px] text-zinc-600 uppercase font-orbitron">Radio Comm</span>
                    <span className="text-white flex items-center gap-1 font-bold">
                      <Radio className="w-3 h-3 text-[#E67E22] animate-pulse" /> HC-05 (IDLE)
                    </span>
                  </div>
                  <div className="bg-black/55 p-2 rounded border border-zinc-900 flex flex-col gap-0.5">
                    <span className="text-[8px] text-zinc-600 uppercase font-orbitron">Radar Echo</span>
                    <span className="text-white flex items-center gap-1 font-bold">
                      <ShieldAlert className="w-3 h-3 text-cyan-400" /> HC-SR04 (40kHz)
                    </span>
                  </div>
                </div>
                
                <div className="text-[9px] text-[#E67E22] flex items-center gap-1 bg-[#E67E22]/5 p-2 rounded border border-[#E67E22]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-ping"></span>
                  <span>SYSTEM OVERRIDE READY // SAFETY ACTIVE</span>
                </div>
              </motion.div>

            </div>

            {/* Bottom Brand & Action APK Download */}
            <motion.div 
              className="relative z-10 mt-6 border-t border-zinc-800 pt-5 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center">
                <span className="text-[9px] font-orbitron font-bold text-zinc-500 uppercase tracking-widest">
                  Chirang Polytechnic
                </span>
                <p className="text-[8px] font-mono text-[#E67E22] uppercase tracking-wider mt-0.5">
                  Dept. of Electrical Engineering
                </p>
              </div>
              
              <Link 
                to="/resources#download" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-xs font-orbitron font-bold py-3 bg-[#E67E22] text-black rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(230,126,34,0.3)] active:scale-95 duration-200"
              >
                <Download className="w-4 h-4" />
                Download Android APK
              </Link>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
