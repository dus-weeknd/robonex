import React, { useState } from 'react';
import { Download, ChevronDown, BookMarked, ChevronRight, Cpu, Battery, Share2, RefreshCw, Star, Smartphone, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('description'); // description, setup

  const faqs = [
    { q: 'Robot is not responding to Bluetooth commands?', a: 'Ensure HC-05 is paired (1234 or 0000). Check if TX/RX pins are correctly cross-connected to Arduino (TX to RX, RX to TX). Remember to disconnect TX/RX while uploading code.' },
    { q: 'Motors are running backwards?', a: 'Reverse the polarity of the DC motor wires connected to the L293D Motor Shield terminals.' },
    { q: 'Ultrasonic sensor always reads 0cm?', a: 'Check the VCC (5V) and GND connections. Ensure Trig (A1) and Echo (A0) pins match the defined pins in the Arduino code.' },
    { q: 'Voice commands fail to execute turns?', a: 'The safety logic prevents turns if an obstacle is within 10cm. Clear the path or switch to manual mode.' },
    { q: 'Cannot upload code to Arduino?', a: 'The HC-05 Bluetooth module must be physically disconnected from Pins 0 (RX) and 1 (TX) during USB code upload to prevent serial conflicts.' }
  ];

  const references = [
    "SriTu Hobby, 'How to Make a Multi-Function Arduino Robot,' SriTu Hobby Official Website.",
    "Arduino, 'Arduino UNO – Official Documentation and Technical Specifications,' Arduino Official Website.",
    "Adafruit Industries, 'Adafruit Motor Shield V1 – AFMotor Library Documentation.'",
    "Elec Freaks, 'HC-SR04 Ultrasonic Sensor – Product Datasheet.'",
    "Tower Pro, 'SG90 9g Micro Servo – Official Datasheet.'",
    "Martyn Currey, 'HC-05 Bluetooth Module – AT Command Reference and Technical Guide.'",
    "Dus Mamud, Iswar Ch. Das, Bhardwaj Sarkar, Dibyajyoti Das and Anup Das, 'Radar System Using Arduino UNO,' Project Report, December 2025.",
    "Bluetooth SIG, 'Bluetooth Core Specification v2.0 + EDR.'"
  ];

  return (
    <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
      
      {/* BREADCRUMBS PATH */}
      <FadeIn>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 font-mono mb-6 uppercase tracking-wider">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-white transition-colors cursor-pointer">Apps</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-white transition-colors cursor-pointer">Utilities & Robotics</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#E67E22] font-bold">RoboNex Controller</span>
        </div>
      </FadeIn>

      {/* CORE APP DETAIL BLOCK */}
      <section id="download" className="mb-8">
        <FadeIn>
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start shadow-xl relative overflow-hidden">
            
            {/* App Icon */}
            <div className="relative w-20 h-20 rounded-2xl border border-zinc-850 p-2 bg-[#1A1A1A] flex items-center justify-center shadow-md shrink-0 self-center sm:self-start">
              <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border border-[#121212] flex items-center justify-center" title="Verified Safe">
                <ShieldCheck className="w-3.5 h-3.5 text-black font-bold" />
              </div>
              <img src="/assets/images/logo.jpg" alt="RoboNex Logo" className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* App Profile Data */}
            <div className="flex-grow flex flex-col gap-3 text-center sm:text-left w-full">
              <div>
                <h2 className="text-lg md:text-xl font-orbitron font-black text-white leading-tight">
                  RoboNex Controller v1.0.4 (Official Release)
                </h2>
                <p className="text-xs text-[#E67E22] font-semibold mt-1">Chirang Polytechnic EE Dept.</p>
              </div>

              {/* Pill Badges */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-2.5 py-0.5 rounded text-[8px] font-orbitron font-black bg-[#E67E22]/10 border border-[#E67E22]/30 text-[#E67E22] uppercase tracking-wider">
                  Project Core
                </span>
                <span className="px-2.5 py-0.5 rounded text-[8px] font-orbitron font-black bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase tracking-wider">
                  VERIFIED SAFE
                </span>
              </div>

              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold mt-1">
                Type: Android Application Package (APK)
              </span>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                Configure custom serial parameters, track ultrasonic distance pings, and trigger speech control loops directly from your smartphone.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-2 border-t border-b border-zinc-800/80 py-4 my-2 text-center w-full">
                <div className="border-r border-zinc-800/80">
                  <span className="block text-xs sm:text-sm font-orbitron font-black text-white">1.0.4</span>
                  <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-wider">Version</span>
                </div>
                <div className="border-r border-zinc-800/80">
                  <span className="block text-xs sm:text-sm font-orbitron font-black text-white">14.2M</span>
                  <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-wider">Size</span>
                </div>
                <div className="border-r border-zinc-800/80 font-bold text-emerald-400">
                  <span className="block text-xs sm:text-sm font-orbitron font-black text-[#E67E22] flex items-center justify-center gap-0.5">
                    FREE
                  </span>
                  <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-wider">Get it on</span>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-orbitron font-black text-white flex items-center justify-center gap-0.5">
                    4.9 <Star className="w-3 h-3 text-[#E67E22] fill-[#E67E22]" />
                  </span>
                  <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-wider">120+ ratings</span>
                </div>
              </div>

              {/* Green APK Download Button */}
              <a 
                href="/assets/apps/robonex_controller.apk"
                download
                className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-orbitron font-black py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.01] active:scale-95 duration-200 mt-2 cursor-pointer shadow-lg"
              >
                <Download className="w-4.5 h-4.5" />
                Download APK
              </a>

              {/* Actions row */}
              <div className="flex gap-6 justify-center sm:justify-start text-xs font-mono text-[#E67E22] mt-2">
                <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Share2 className="w-3.5 h-3.5" /> Share App
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" /> Request Support
                </button>
              </div>

            </div>

          </div>
        </FadeIn>
      </section>

      {/* APK STATS SUMMARY DETAILS */}
      <section className="mb-8">
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 text-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase">VERSION</span>
              <span className="block font-orbitron font-black text-sm text-[#E67E22] mt-1">1.0.4</span>
              <span className="text-[8px] text-zinc-500 font-mono">Latest Release</span>
            </div>
            <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 text-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase">SIZE</span>
              <span className="block font-orbitron font-black text-sm text-[#E67E22] mt-1">14.2 MB</span>
              <span className="text-[8px] text-zinc-500 font-mono">Total Package</span>
            </div>
            <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 text-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase">GENRE</span>
              <span className="block font-orbitron font-black text-sm text-[#E67E22] mt-1">Robotics & HMI</span>
              <span className="text-[8px] text-zinc-500 font-mono">Utility Platform</span>
            </div>
            <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 text-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase">DEVELOPER</span>
              <span className="block font-orbitron font-black text-sm text-[#E67E22] mt-1">EE Dept. Team</span>
              <span className="text-[8px] text-zinc-500 font-mono">Chirang Polytechnic</span>
            </div>
            <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 text-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase">REACHED</span>
              <span className="block font-orbitron font-black text-sm text-[#E67E22] mt-1">250+ Compiles</span>
              <span className="text-[8px] text-zinc-500 font-mono">Lab Installations</span>
            </div>
            <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 text-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase">UPDATED</span>
              <span className="block font-orbitron font-black text-sm text-[#E67E22] mt-1">May 23, 2026</span>
              <span className="text-[8px] text-zinc-500 font-mono">Active Development</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* DYNAMIC DESCRIPTION / INSTALLATION GUIDE TABS */}
      <section className="mb-20">
        <FadeIn>
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden shadow-md">
            
            {/* Dynamic Tab headers */}
            <div className="flex border-b border-zinc-800 bg-[#1A1A1A]/40 font-orbitron">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
                  activeTab === 'description' ? 'text-[#E67E22]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Description
                {activeTab === 'description' && (
                  <motion.span 
                    layoutId="activeTabIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E67E22] shadow-[0_0_8px_#E67E22]" 
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('setup')}
                className={`flex-1 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
                  activeTab === 'setup' ? 'text-[#E67E22]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Setup & Guide
                {activeTab === 'setup' && (
                  <motion.span 
                    layoutId="activeTabIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E67E22] shadow-[0_0_8px_#E67E22]" 
                  />
                )}
              </button>
            </div>

            {/* Tab content panel */}
            <div className="p-6 md:p-8 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {activeTab === 'description' ? (
                <div className="space-y-4">
                  <p>
                    The <strong>RoboNex Controller Application</strong> is a dedicated utility built to expand the control options of the RoboNex robot car. The app uses the Bluetooth Serial Port Profile (SPP) to establish a direct connection with the onboard <strong>HC-05 Bluetooth module</strong>.
                  </p>
                  <p>
                    Once connected, the app operates as a wireless control deck, allowing you to transmit directional command bytes (such as Forward, Backward, Left, Right, and Stop) in real time. It also integrates speech-recognition APIs to parse spoken navigation prompts.
                  </p>
                  <p>
                    To ensure safe operation, the app works in tandem with the robot's onboard safety loops. If the ultrasonic sensor reads obstacles closer than 10cm, the system automatically intervenes to prevent collision damage, visual warnings are displayed, and motor overrides are triggered.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-orbitron font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-2">Configuration & Setup Steps:</h3>
                  <ul className="space-y-3 font-mono text-[11px] sm:text-xs">
                    <li className="flex gap-2">
                      <span className="text-[#E67E22] font-bold">[01]</span>
                      <span><strong>Pairing Code:</strong> Turn on the robot car. Pair your phone with the HC-05 Bluetooth module using PIN <code>1234</code> or <code>0000</code>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#E67E22] font-bold">[02]</span>
                      <span><strong>Baud Rate:</strong> Configure the Arduino code's hardware serial port rate to <code>9600 BAUD</code>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#E67E22] font-bold">[03]</span>
                      <span><strong>Installation:</strong> Enable <strong>"Install from Unknown Sources"</strong> in your device settings to permit APK installation.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-400 font-bold">[04]</span>
                      <span><strong>USB uploads:</strong> Make sure to disconnect the HC-05 module's RX/TX wires from pins 0 and 1 during Arduino code USB uploads to avoid conflicts.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </FadeIn>
      </section>

      {/* ACCORDION TROUBLESHOOTING FAQS */}
      <section className="mb-20">
        <FadeIn>
          <h2 className="text-xl sm:text-2xl font-orbitron font-bold mb-8 flex items-center gap-3">
            Troubleshooting Guide
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-[#1A1A1A] rounded-xl border border-zinc-800 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-orbitron font-bold text-base sm:text-lg text-white hover:text-[#E67E22] transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-[#E67E22] transition-transform group-open:-rotate-180 shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <div className="w-full h-px bg-zinc-800/80 mb-4"></div>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* REFERENCE BIBLIOGRAPHY LIST */}
      <section className="mb-12">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <BookMarked className="w-6 h-6 text-[#E67E22]" />
            <h2 className="text-xl sm:text-2xl font-orbitron font-bold">References & Bibliography</h2>
          </div>
          <div className="bg-[#121212] p-6 sm:p-8 rounded-2xl border border-zinc-800">
            <ul className="space-y-4">
              {references.map((ref, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400">
                  <span className="text-[#E67E22] font-mono font-bold">[{idx + 1}]</span>
                  <span className="leading-relaxed">{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Resources;
