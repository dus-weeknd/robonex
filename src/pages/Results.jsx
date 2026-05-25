import React from 'react';
import { Target, Mic2, AlertTriangle, Lightbulb } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Results = () => {
  return (
    <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-4">Testing & <span className="text-[#E67E22]">Results</span></h1>
          <p className="text-[#8A8A8A] text-lg">Performance analysis, limitations, and future scope of the project.</p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {/* DISTANCE ACCURACY */}
        <FadeIn delay={0.1}>
          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A] h-full">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-[#E67E22]" />
              <h2 className="text-xl font-orbitron font-bold">Obstacle Sensor Accuracy</h2>
            </div>
            <p className="text-[#8A8A8A] text-sm mb-6">
              10 trials from 5cm to 40cm. The threshold (≤12cm) triggered correctly in 100% of scenarios.
            </p>
            <div className="text-center bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
              <span className="text-5xl font-orbitron font-black text-white">98.2<span className="text-[#E67E22]">%</span></span>
              <p className="text-[#8A8A8A] mt-2 font-mono text-sm">AVERAGE ACCURACY</p>
            </div>
          </div>
        </FadeIn>

        {/* VOICE ACCURACY */}
        <FadeIn delay={0.2}>
          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A] h-full">
            <div className="flex items-center gap-3 mb-6">
              <Mic2 className="w-6 h-6 text-[#E67E22]" />
              <h2 className="text-xl font-orbitron font-bold">Voice Recognition</h2>
            </div>
            <p className="text-[#8A8A8A] text-sm mb-6">
              50 spoken trials using Google Speech-to-Text API. Execution accuracy for recognized commands was 100%.
            </p>
            <div className="text-center bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
              <span className="text-5xl font-orbitron font-black text-white">96.0<span className="text-[#E67E22]">%</span></span>
              <p className="text-[#8A8A8A] mt-2 font-mono text-sm">RECOGNITION RATE</p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ERROR ANALYSIS */}
      <section className="mb-20">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-orbitron font-bold">Limitations & Error Analysis</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#121212] p-6 rounded-xl border border-red-900/30">
              <h3 className="font-orbitron font-bold text-white mb-2">Sensor Surface Dependency</h3>
              <p className="text-sm text-[#8A8A8A]">
                The HC-SR04 struggles with soft (cloth) or angled surfaces which deflect/absorb the echo, causing under-detection.
              </p>
            </div>
            <div className="bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
              <h3 className="font-orbitron font-bold text-white mb-2">The "Tunnel" Problem</h3>
              <p className="text-sm text-[#8A8A8A]">
                In narrow corridors (&lt;30cm wide), both L and R scans yield &lt;12cm. The robot oscillates back and forth due to the lack of a "both-blocked" fallback logic.
              </p>
            </div>
            <div className="bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
              <h3 className="font-orbitron font-bold text-white mb-2">Bluetooth Range</h3>
              <p className="text-sm text-[#8A8A8A]">
                The HC-05 Class 2 module works flawlessly up to 8m line-of-sight, but connection drops significantly through multiple brick walls.
              </p>
            </div>
            <div className="bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
              <h3 className="font-orbitron font-bold text-white mb-2">Internet Dependency for Voice</h3>
              <p className="text-sm text-[#8A8A8A]">
                The Android app relies on Google APIs. Recognition drops to 60-70% offline or in noisy environments.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FUTURE SCOPE */}
      <section className="mb-12">
        <FadeIn>
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] p-8 md:p-12 rounded-2xl border border-[#E67E22]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E67E22]/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <Lightbulb className="w-8 h-8 text-[#E67E22]" />
              <h2 className="text-3xl font-orbitron font-bold">Future Upgrades</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div>
                <h3 className="text-[#E67E22] font-orbitron font-bold mb-3">Custom RoboNex App (Flutter)</h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">
                  Developing a custom application to allow instant mode-switching via Bluetooth (transmitting 'M', 'O', 'V'), completely eliminating the need to physically reconnect and re-upload Arduino code.
                </p>
              </div>
              <div>
                <h3 className="text-[#E67E22] font-orbitron font-bold mb-3">IoT & FPV Camera</h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">
                  Upgrading from HC-05 to an ESP32 or ESP32-CAM module to enable global Wi-Fi control and real-time First-Person View video streaming.
                </p>
              </div>
              <div>
                <h3 className="text-[#E67E22] font-orbitron font-bold mb-3">Continuous Radar Map</h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">
                  Integrating the previous semester's 'Radar Sweep' logic into the RoboNex app to generate a real-time visual map of the environment on the smartphone screen.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Results;
