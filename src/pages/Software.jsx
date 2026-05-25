import React from 'react';
import { GitMerge, ShieldAlert } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Software = () => {
  return (
    <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-4">Software <span className="text-[#E67E22]">Methodology</span></h1>
          <p className="text-[#8A8A8A] text-lg">Arduino programming logic, control flow, and safety algorithms.</p>
        </div>
      </FadeIn>

      {/* OBSTACLE AVOIDANCE */}
      <section className="mb-20">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#E67E22]/10 rounded-xl border border-[#E67E22]/30">
              <ShieldAlert className="w-6 h-6 text-[#E67E22]" />
            </div>
            <h2 className="text-2xl font-orbitron font-bold">1. Obstacle Avoidance Logic</h2>
          </div>
          
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] overflow-hidden grid lg:grid-cols-2">
            <div className="p-8">
              <p className="text-[#8A8A8A] leading-relaxed mb-6">
                The <code className="text-[#E67E22] bg-[#E67E22]/10 px-2 py-0.5 rounded">Obstacle()</code> function implements the autonomous navigation algorithm. It measures the forward distance continuously and triggers a stop-and-scan sequence if an object is closer than 12 cm.
              </p>
              <ul className="space-y-4 text-sm text-[#8A8A8A]">
                <li className="flex items-start gap-2">
                  <span className="text-[#E67E22] font-bold">1.</span>
                  <span><strong>Path Clear (&gt;12 cm):</strong> Robot moves forward.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E67E22] font-bold">2.</span>
                  <span><strong>Obstacle Detected (≤12 cm):</strong> Robot stops immediately and reverses for 100ms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E67E22] font-bold">3.</span>
                  <span><strong>Scan Left:</strong> Servo rotates to 180°. Distance stored in <code className="font-mono text-white">L</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E67E22] font-bold">4.</span>
                  <span><strong>Scan Right:</strong> Servo rotates to 20°. Distance stored in <code className="font-mono text-white">R</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E67E22] font-bold">5.</span>
                  <span><strong>Decision:</strong> If L &lt; R, turn Right. If L &gt; R, turn Left.</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#121212] p-6 border-l border-[#2A2A2A]">
              <pre className="text-xs font-mono text-blue-300 overflow-x-auto whitespace-pre-wrap">
{`void Obstacle() { 
  distance = ultrasonic(); 
  if (distance <= 12) { 
    Stop(); 
    backward(); delay(100); Stop(); 

    L = leftsee(); 
    servo.write(spoint); delay(800); 
    R = rightsee(); 
    servo.write(spoint); 

    if (L < R) { right(); delay(500); Stop(); delay(200); } 
    else if (L > R) { left(); delay(500); Stop(); delay(200); } 
  } else { 
    forward(); 
  } 
}`}
              </pre>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* VOICE CONTROL SAFETY CHECK */}
      <section className="mb-20">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#E67E22]/10 rounded-xl border border-[#E67E22]/30">
              <ShieldAlert className="w-6 h-6 text-[#E67E22]" />
            </div>
            <h2 className="text-2xl font-orbitron font-bold">2. Voice Control Safety Check</h2>
          </div>
          <p className="text-[#8A8A8A] leading-relaxed mb-6 max-w-3xl">
            Unlike simple Bluetooth mode where commands execute blindly, Voice Control incorporates an intelligent safety check before turning. If the user commands a turn, the robot physically checks that direction's clearance before executing.
          </p>
          
          {/* Mobile swipe helper */}
          <div className="flex items-center gap-1.5 justify-center md:hidden mb-3 text-[10px] font-mono text-[#E67E22] animate-pulse">
            <span>← Swipe table horizontally to view safety states →</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#2A2A2A]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#8A8A8A] uppercase bg-[#1A1A1A] font-orbitron">
                <tr>
                  <th className="px-6 py-4">Voice Command</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Safety Condition</th>
                  <th className="px-6 py-4">Final Execution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2A2A2A] bg-[#121212]">
                  <td className="px-6 py-4 text-white font-bold">"Left" (&lt;)</td>
                  <td className="px-6 py-4 text-[#8A8A8A]">Scan Left (leftsee)</td>
                  <td className="px-6 py-4 text-green-400 font-mono">L ≥ 10 cm</td>
                  <td className="px-6 py-4 text-white">Turn Left 500ms, Stop</td>
                </tr>
                <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]/30">
                  <td className="px-6 py-4 text-white font-bold">"Left" (&lt;)</td>
                  <td className="px-6 py-4 text-[#8A8A8A]">Scan Left (leftsee)</td>
                  <td className="px-6 py-4 text-red-400 font-mono">L &lt; 10 cm</td>
                  <td className="px-6 py-4 text-white">Stop (Prevent Collision)</td>
                </tr>
                <tr className="border-b border-[#2A2A2A] bg-[#121212]">
                  <td className="px-6 py-4 text-white font-bold">"Right" (&gt;)</td>
                  <td className="px-6 py-4 text-[#8A8A8A]">Scan Right (rightsee)</td>
                  <td className="px-6 py-4 text-green-400 font-mono">R ≥ 10 cm</td>
                  <td className="px-6 py-4 text-white">Turn Right 500ms, Stop</td>
                </tr>
                <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]/30">
                  <td className="px-6 py-4 text-white font-bold">"Right" (&gt;)</td>
                  <td className="px-6 py-4 text-[#8A8A8A]">Scan Right (rightsee)</td>
                  <td className="px-6 py-4 text-red-400 font-mono">R &lt; 10 cm</td>
                  <td className="px-6 py-4 text-white">Stop (Prevent Collision)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* MODE SWITCHING */}
      <section className="mb-12">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#E67E22]/10 rounded-xl border border-[#E67E22]/30">
              <GitMerge className="w-6 h-6 text-[#E67E22]" />
            </div>
            <h2 className="text-2xl font-orbitron font-bold">3. Mode Switching Architecture</h2>
          </div>
          
          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A]">
            <p className="text-[#8A8A8A] leading-relaxed mb-6">
              All three modes exist simultaneously in the Arduino sketch. The active mode is selected by commenting (<code className="text-[#E67E22] bg-[#E67E22]/10 px-1 rounded">//</code>) or uncommenting the corresponding function call inside the <code className="text-white">loop()</code>.
            </p>
            <pre className="text-sm font-mono text-green-400 bg-[#121212] p-6 rounded-xl border border-[#2A2A2A] overflow-x-auto">
{`void loop() { 
  // ---- ACTIVATE ONE MODE AT A TIME ---- 
  // Remove '//' from ONE line only: 
  
  //Obstacle();          // Mode 1: Autonomous
  //Bluetoothcontrol();  // Mode 2: Manual
  voicecontrol();      // Mode 3: Voice (Currently Active)
}`}
            </pre>
            <p className="text-[#8A8A8A] text-sm mt-6">
              * Note: For future scope, an upgrade to wireless Bluetooth-based mode switching is planned, eliminating the need to re-upload code.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Software;
