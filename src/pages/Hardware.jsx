import React from 'react';
import { Cpu, Zap, Activity, Battery, Car } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Hardware = () => {
  const components = [
    {
      title: "Arduino UNO (Microcontroller)",
      icon: <Cpu className="w-6 h-6 text-[#E67E22]" />,
      desc: "The central processing unit based on the ATmega328P. It runs at 16 MHz, generating trigger pulses for the ultrasonic sensor, processing Bluetooth serial data, and sending PWM signals to the L293D motor shield and SG90 servo.",
      specs: [
        { label: "Microcontroller", value: "ATmega328P (8-bit AVR)" },
        { label: "Clock Speed", value: "16 MHz" },
        { label: "Operating Voltage", value: "5V DC" }
      ]
    },
    {
      title: "L293D Motor Driver Shield",
      icon: <Zap className="w-6 h-6 text-[#E67E22]" />,
      desc: "A purpose-built expansion board that integrates two L293D H-Bridge ICs. It stacks directly on the Arduino and can independently control four separate DC motors. Includes built-in flyback diodes for voltage spike protection.",
      specs: [
        { label: "Motor ICs", value: "2 × L293D" },
        { label: "Supported Motors", value: "4 (M1, M2, M3, M4)" },
        { label: "Peak Current", value: "1.2A per channel" }
      ]
    },
    {
      title: "HC-SR04 Ultrasonic Sensor",
      icon: <Activity className="w-6 h-6 text-[#E67E22]" />,
      desc: "Operates on the Time-of-Flight principle. The transmitter emits a 40 kHz ultrasonic burst, and the receiver detects the echo. Distance is calculated using the formula: Distance (cm) = t / (29 × 2).",
      specs: [
        { label: "Operating Range", value: "2 cm – 400 cm" },
        { label: "Frequency", value: "40 kHz" },
        { label: "Resolution", value: "~3 mm" }
      ]
    },
    {
      title: "DC Gear Motors & Chassis",
      icon: <Car className="w-6 h-6 text-[#E67E22]" />,
      desc: "Four TT DC Gear Motors (1:48 ratio) provide mobility. Mounted on a lightweight foam board chassis, they offer a good balance of speed (200 RPM) and torque (800 g·cm) for carrying the system components.",
      specs: [
        { label: "No-Load Speed", value: "~200 RPM (at 6V)" },
        { label: "Stall Torque", value: "~800 g·cm" },
        { label: "Wheels", value: "65mm Rubber Tyres" }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-4">Hardware <span className="text-[#E67E22]">Design</span></h1>
          <p className="text-[#8A8A8A] text-lg">System architecture, component specifications, and power budget.</p>
        </div>
      </FadeIn>

      {/* BLOCK DIAGRAM SECTION */}
      <section className="mb-20">
        <FadeIn>
          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A]">
            <h2 className="text-2xl font-orbitron font-bold mb-6 border-b border-[#2A2A2A] pb-4">System Architecture</h2>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div className="bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
                <h3 className="font-orbitron font-bold text-[#E67E22] mb-4">1. Input Stage</h3>
                <ul className="space-y-3 text-[#8A8A8A]">
                  <li>• <strong>HC-SR04 Sensor:</strong> Measures distance, sends digital echo.</li>
                  <li>• <strong>HC-05 Bluetooth:</strong> Receives serial data from Android App.</li>
                </ul>
              </div>
              <div className="bg-[#121212] p-6 rounded-xl border border-[#E67E22]/30 shadow-[0_0_15px_rgba(230,126,34,0.1)]">
                <h3 className="font-orbitron font-bold text-white mb-4">2. Processing Stage</h3>
                <ul className="space-y-3 text-[#8A8A8A]">
                  <li>• <strong>Arduino UNO:</strong> Calculates distance, parses serial commands, executes active mode logic.</li>
                  <li>• Generates PWM control signals.</li>
                </ul>
              </div>
              <div className="bg-[#121212] p-6 rounded-xl border border-[#2A2A2A]">
                <h3 className="font-orbitron font-bold text-[#E67E22] mb-4">3. Output Stage</h3>
                <ul className="space-y-3 text-[#8A8A8A]">
                  <li>• <strong>L293D Shield:</strong> Drives 4x DC Motors.</li>
                  <li>• <strong>SG90 Servo:</strong> Rotates sensor for scanning (20°, 103°, 180°).</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* COMPONENTS SECTION */}
      <section className="mb-20">
        <FadeIn>
          <h2 className="text-2xl font-orbitron font-bold mb-8">Core Components</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          {components.map((comp, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-[#121212] p-6 rounded-xl border border-[#1A1A1A] h-full hover:border-[#2A2A2A] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                    {comp.icon}
                  </div>
                  <h3 className="text-lg font-orbitron font-bold">{comp.title}</h3>
                </div>
                <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">{comp.desc}</p>
                <div className="bg-[#080808] rounded-lg border border-[#1A1A1A] p-4">
                  {comp.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between text-xs py-1.5 border-b border-[#1A1A1A] last:border-0">
                      <span className="text-[#6A6A6A]">{spec.label}</span>
                      <span className="text-[#F0F0F0] font-mono">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* POWER BUDGET */}
      <section className="mb-12">
        <FadeIn>
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] overflow-hidden">
            <div className="p-6 md:p-8 border-b border-[#2A2A2A] flex items-center gap-3">
              <Battery className="w-6 h-6 text-[#E67E22]" />
              <h2 className="text-2xl font-orbitron font-bold">Power Budget Analysis</h2>
            </div>
            <div className="p-6 md:p-8 bg-[#121212]">
              <p className="text-[#8A8A8A] text-sm mb-6">
                The robot is powered by two 3.7V Li-ion 18650 batteries connected in series (7.4V nominal). The L293D shield distributes this directly to the motors and routes it through the Arduino's onboard voltage regulator (5V) for logic.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-[#8A8A8A] uppercase bg-[#1A1A1A] font-orbitron">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-lg">Component</th>
                      <th className="px-6 py-4 rounded-tr-lg">Typical Current Draw</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="px-6 py-4 text-white">Arduino UNO (logic)</td>
                      <td className="px-6 py-4 text-[#E67E22] font-mono">~50 mA</td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="px-6 py-4 text-white">HC-SR04 Ultrasonic Sensor</td>
                      <td className="px-6 py-4 text-[#E67E22] font-mono">~15 mA</td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="px-6 py-4 text-white">SG90 Servo Motor (moving)</td>
                      <td className="px-6 py-4 text-[#E67E22] font-mono">~100–250 mA</td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="px-6 py-4 text-white">HC-05 Bluetooth Module</td>
                      <td className="px-6 py-4 text-[#E67E22] font-mono">~40 mA</td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="px-6 py-4 text-white">4 × DC Gear Motors (loaded)</td>
                      <td className="px-6 py-4 text-[#E67E22] font-mono">~400–600 mA total</td>
                    </tr>
                    <tr className="bg-[#1A1A1A]/50">
                      <td className="px-6 py-4 font-bold text-white rounded-bl-lg">Estimated Total Peak Current</td>
                      <td className="px-6 py-4 font-bold text-[#E67E22] font-mono rounded-br-lg">~700–950 mA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Hardware;
