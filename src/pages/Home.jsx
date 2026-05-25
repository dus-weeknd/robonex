import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, ShieldAlert, Smartphone, Mic, Cpu, Zap, Activity, 
  Battery, Users, Settings, Terminal, Radio, HelpCircle, ArrowRight, Play, Square 
} from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Home = () => {
  // Simulator State
  const [activeSimMode, setActiveSimMode] = useState('obstacle'); // obstacle, bluetooth, voice
  const [simDistance, setSimDistance] = useState(35); // in cm
  const [simServoAngle, setSimServoAngle] = useState(90); // 90 = center, 180 = left, 20 = right
  const [motors, setMotors] = useState({ fl: 'stop', fr: 'stop', rl: 'stop', rr: 'stop' }); // forward, backward, stop
  const [simLogs, setSimLogs] = useState([
    '[SYSTEM] RoboNex OS v1.0 Booted Successfully.',
    '[SYSTEM] Microcontroller Arduino UNO Initialized.',
    '[SYSTEM] HC-05 Bluetooth transceiver online.',
    '[SYSTEM] Default Mode: Autonomous Obstacle Avoidance active.'
  ]);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [currentAction, setCurrentAction] = useState('Standby');
  
  const simTimerRef = useRef(null);
  const logsEndRef = useRef(null);
  const initialLogsLength = useRef(simLogs.length);

  // Auto-scroll logs
  useEffect(() => {
    if (simLogs.length > initialLogsLength.current && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [simLogs]);

  // Helper to add log with timestamp
  const addLog = (message) => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setSimLogs(prev => [...prev, `[${time}] ${message}`]);
  };

  // Reset simulator
  const resetSimulator = () => {
    if (simTimerRef.current) clearTimeout(simTimerRef.current);
    setIsSimRunning(false);
    setSimServoAngle(90);
    setMotors({ fl: 'stop', fr: 'stop', rl: 'stop', rr: 'stop' });
    setCurrentAction('Standby');
    addLog('[SYSTEM] Simulator reset to Standby.');
  };

  // Change mode handler
  const handleModeChange = (mode) => {
    resetSimulator();
    setActiveSimMode(mode);
    const modeName = mode === 'obstacle' ? 'Autonomous Obstacle Avoidance' : mode === 'bluetooth' ? 'Bluetooth Manual Control' : 'Voice Control Override';
    addLog(`[SYSTEM] Mode switched to: ${modeName}`);
  };

  // Simulated Motor Control Commands
  const setAllMotors = (direction) => {
    if (direction === 'forward') {
      setMotors({ fl: 'forward', fr: 'forward', rl: 'forward', rr: 'forward' });
    } else if (direction === 'backward') {
      setMotors({ fl: 'backward', fr: 'backward', rl: 'backward', rr: 'backward' });
    } else if (direction === 'left') {
      setMotors({ fl: 'backward', fr: 'forward', rl: 'backward', rr: 'forward' });
    } else if (direction === 'right') {
      setMotors({ fl: 'forward', fr: 'backward', rl: 'forward', rr: 'backward' });
    } else {
      setMotors({ fl: 'stop', fr: 'stop', rl: 'stop', rr: 'stop' });
    }
  };

  // 1. OBSTACLE AVOIDANCE SYSTEM LOGIC SIMULATION
  useEffect(() => {
    if (activeSimMode !== 'obstacle') return;

    if (simDistance <= 12) {
      // Trigger stop and scan sequence
      setIsSimRunning(true);
      setCurrentAction('Obstacle Detected! Stopping...');
      setAllMotors('stop');
      addLog(`[OBSTACLE] HC-SR04 reads ${simDistance}cm (Threshold <= 12cm). STOP command issued.`);

      // Step 1: Reverse slightly
      simTimerRef.current = setTimeout(() => {
        setCurrentAction('Reversing slightly...');
        setAllMotors('backward');
        addLog('[OBSTACLE] Reversing motors for 100ms...');

        // Step 2: Stop and scan Left
        simTimerRef.current = setTimeout(() => {
          setAllMotors('stop');
          setCurrentAction('Scanning Left (180°)...');
          setSimServoAngle(180);
          const leftDistance = Math.floor(Math.random() * 25) + 15; // Random clear distance 15-40
          addLog(`[SERVO] Sweeping 180° (Left). Left Distance L = ${leftDistance}cm`);

          // Step 3: Scan Right
          simTimerRef.current = setTimeout(() => {
            setCurrentAction('Scanning Right (20°)...');
            setSimServoAngle(20);
            const rightDistance = Math.floor(Math.random() * 25) + 5; // Random distance 5-30
            addLog(`[SERVO] Sweeping 20° (Right). Right Distance R = ${rightDistance}cm`);

            // Step 4: Decision
            simTimerRef.current = setTimeout(() => {
              setSimServoAngle(90); // Center servo
              const turnDir = leftDistance > rightDistance ? 'LEFT' : 'RIGHT';
              setCurrentAction(`Turning ${turnDir}...`);
              setAllMotors(turnDir.toLowerCase());
              addLog(`[DECISION] L (${leftDistance}cm) ${leftDistance > rightDistance ? '>' : '<'} R (${rightDistance}cm). Initiating ${turnDir} turn.`);

              // Step 5: Resume Forward
              simTimerRef.current = setTimeout(() => {
                setCurrentAction('Path Clear. Moving Forward.');
                setAllMotors('forward');
                setIsSimRunning(false);
                addLog('[OBSTACLE] Turn completed. Resuming forward drive.');
              }, 1200);

            }, 1000);
          }, 1000);
        }, 300);
      }, 500);

    } else {
      // Path clear
      if (!isSimRunning) {
        setAllMotors('forward');
        setCurrentAction('Moving Forward (Autonomous)');
      }
    }

    return () => {
      if (simTimerRef.current) clearTimeout(simTimerRef.current);
    };
  }, [simDistance, activeSimMode]);

  // 2. BLUETOOTH MANUAL DRIVING
  const handleBluetoothCommand = (cmd) => {
    if (activeSimMode !== 'bluetooth') return;
    
    addLog(`[HC-05] Serial received byte: '${cmd}'`);
    if (cmd === 'F') {
      setCurrentAction('Manual Forward');
      setAllMotors('forward');
      addLog('[MOTOR] Driving Forward at 180 PWM');
    } else if (cmd === 'B') {
      setCurrentAction('Manual Backward');
      setAllMotors('backward');
      addLog('[MOTOR] Driving Backward at 180 PWM');
    } else if (cmd === 'L') {
      setCurrentAction('Turning Left (Manual)');
      setAllMotors('left');
      addLog('[MOTOR] Zero-Radius turn Left');
    } else if (cmd === 'R') {
      setCurrentAction('Turning Right (Manual)');
      setAllMotors('right');
      addLog('[MOTOR] Zero-Radius turn Right');
    } else if (cmd === 'S') {
      setCurrentAction('Standby (Stopped)');
      setAllMotors('stop');
      addLog('[MOTOR] All motors stopped.');
    }
  };

  // 3. VOICE OVERRIDE SIMULATION
  const handleVoiceCommand = (phrase) => {
    if (activeSimMode !== 'voice') return;
    
    addLog(`[ANDROID APP] Speech-to-Text: "${phrase}"`);
    setCurrentAction(`Parsing voice: "${phrase}"`);

    // Safety checks before turning
    if (phrase === 'LEFT') {
      addLog('[VOICE] Command matches "LEFT". Initiating safety clearance check...');
      setSimServoAngle(180);
      
      simTimerRef.current = setTimeout(() => {
        // Look at current distance (mocking left see)
        if (simDistance < 10) {
          setCurrentAction('COLLISION WARNING: LEFT BLOCKED');
          setAllMotors('stop');
          addLog(`[SAFETY] Alert! Left path is BLOCKED (${simDistance}cm <= 10cm). Command aborted.`);
          setSimServoAngle(90);
        } else {
          setCurrentAction('Path Clear. Turning Left...');
          setAllMotors('left');
          addLog(`[SAFETY] Clear! Left path is ${simDistance}cm. Turning Left for 500ms...`);
          
          simTimerRef.current = setTimeout(() => {
            setAllMotors('stop');
            setCurrentAction('Voice Turn Complete.');
            setSimServoAngle(90);
            addLog('[MOTOR] Stopped after turn.');
          }, 800);
        }
      }, 800);
    } 
    else if (phrase === 'RIGHT') {
      addLog('[VOICE] Command matches "RIGHT". Initiating safety clearance check...');
      setSimServoAngle(20);

      simTimerRef.current = setTimeout(() => {
        if (simDistance < 10) {
          setCurrentAction('COLLISION WARNING: RIGHT BLOCKED');
          setAllMotors('stop');
          addLog(`[SAFETY] Alert! Right path is BLOCKED (${simDistance}cm <= 10cm). Command aborted.`);
          setSimServoAngle(90);
        } else {
          setCurrentAction('Path Clear. Turning Right...');
          setAllMotors('right');
          addLog(`[SAFETY] Clear! Right path is ${simDistance}cm. Turning Right for 500ms...`);
          
          simTimerRef.current = setTimeout(() => {
            setAllMotors('stop');
            setCurrentAction('Voice Turn Complete.');
            setSimServoAngle(90);
            addLog('[MOTOR] Stopped after turn.');
          }, 800);
        }
      }, 800);
    } 
    else if (phrase === 'GO') {
      if (simDistance <= 12) {
        setCurrentAction('COLLISION WARNING: FRONT BLOCKED');
        setAllMotors('stop');
        addLog(`[SAFETY] Cannot execute "GO". Front obstacle detected (${simDistance}cm).`);
      } else {
        setCurrentAction('Voice driving Forward...');
        setAllMotors('forward');
        addLog('[VOICE] Executing command: GO');
      }
    } 
    else if (phrase === 'STOP') {
      setCurrentAction('Voice Stop.');
      setAllMotors('stop');
      addLog('[VOICE] Executing command: STOP');
    } 
    else if (phrase === 'BACK') {
      setCurrentAction('Voice driving Backward...');
      setAllMotors('backward');
      addLog('[VOICE] Executing command: BACK');
    }
  };

  // Team Data
  const teamMembers = [
    {
      name: "Dus Mamud",
      roll: "CHP/23/EL/020",
      role: "Project Lead & Hardware Architect",
      desc: "Designed overall electrical schematic, power distribution network, and chassis layout.",
      img: "/assets/images/dus_mamud.jpg"
    },
    {
      name: "Iswar Ch. Das",
      roll: "CHP/23/EL/025",
      role: "Lead Firmware Developer",
      desc: "Programmed the Arduino UNO microcontroller, optimized the ultrasonic scanning logic, and integrated servo motor timings.",
      img: "/assets/images/iswar_ch_das.jpg"
    },
    {
      name: "Bhardwaj Sarkar",
      roll: "CHP/23/EL/008",
      role: "Telemetry & Bluetooth Integration",
      desc: "Integrated the HC-05 module, configured the serial command protocol, and calibrated manual driving dynamics.",
      img: "/assets/images/bhardwaj.jpg"
    },
    {
      name: "Anup Das",
      roll: "CHP/23/EL/005",
      role: "Testing & System Calibration",
      desc: "Conducted field testing for obstacle avoidance thresholds, measured sensor accuracies, and calibrated wheel speed levels.",
      img: "/assets/images/anup.jpg"
    },
    {
      name: "Dibyajyoti Das",
      roll: "CHP/23/EL/016",
      role: "Companion Android App Lead",
      desc: "Developed and configured the companion Android application, integrated the Google Speech-to-Text API, and mapped the UI.",
      img: "/assets/images/bidyajyoti.jpg"
    },
    {
      name: "Nazrul Islam",
      roll: "CHP/23/EL/046",
      role: "Documentation & CAD Modeling",
      desc: "Authored technical reports, designed layouts, and compiled the component datasheet specifications.",
      img: "/assets/images/nazrul.jpg"
    },
    {
      name: "Sourabh Sarkar",
      roll: "CHP/23/EL/059",
      role: "Hardware Testing & Assembly Assistant",
      desc: "Assisted in circuit assembly, conducted electrical connection sanity checks, and verified sensor alignments.",
      img: "/assets/images/sourabh.jpg"
    }
  ];

  // Guides Data
  const advisors = [
    {
      name: "Ms. Chinmayee Medhi",
      role: "Project Guide",
      title: "Lecturer, Dept. of Electrical Engineering",
      desc: "Provided technical oversight, guided component selection, and assisted in troubleshooting sensor calibration.",
      img: "/assets/images/guide.jpg"
    },
    {
      name: "Mr. Amit Kumar Das",
      role: "Head of Department (H.O.D)",
      title: "H.O.D, Dept. of Electrical Engineering",
      desc: "Provided institutional support, project resources, laboratory facilities, and semester evaluation coordinates.",
      img: "/assets/images/hod.jpg"
    }
  ];

  return (
    <div className="pt-24 pb-12 bg-grid-cyber">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-6 overflow-hidden">
        {/* Neon blur blobs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#E67E22]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#E67E22]/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E67E22]/30 bg-[#E67E22]/5 text-[#E67E22] text-xs font-orbitron font-bold mb-6 tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              CHP/23/EL ELECTRICAL ENGG. PROJECT
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-orbitron font-black leading-none mb-6">
              INTELLIGENT <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E67E22] via-orange-400 to-yellow-500 drop-shadow-[0_0_15px_rgba(230,126,34,0.3)]">
                MULTI-MODE
              </span> <br/>
              ROBOT CAR
            </h1>
            
            <p className="text-lg text-[#8A8A8A] mb-8 leading-relaxed max-w-xl">
              An advanced, cost-effective autonomous system engineered for research and educational robotics. Operating on <strong>Arduino UNO</strong> and equipped with HC-SR04 scanning radar, Bluetooth telemetry modules, and intelligent voice override safety protocols.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#simulator" 
                className="px-8 py-4 bg-[#E67E22] text-black font-orbitron font-bold rounded-lg hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:scale-[1.03]"
              >
                Launch Simulator
              </a>
              <a 
                href="#demo" 
                className="px-8 py-4 bg-[#1A1A1A] border border-[#2A2A2A] text-white font-orbitron font-bold rounded-lg hover:border-[#E67E22]/50 hover:bg-[#222] transition-colors flex items-center gap-2"
              >
                <Video className="w-5 h-5" /> Watch Demonstration
              </a>
            </div>
          </motion.div>

          {/* Hero Right: Interactive Dashboard Widget */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative p-6 bg-[#121212]/80 backdrop-blur-md rounded-2xl border border-[#2A2A2A] shadow-2xl overflow-hidden group">
              {/* Scanlines overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E67E22]/5 to-transparent h-1/2 w-full animate-scan pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 border-b border-[#2A2A2A] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-orbitron font-bold text-xs uppercase tracking-wider text-emerald-500">Telemetry Stream</span>
                </div>
                <div className="text-xs font-mono text-[#E67E22]">RX: 9600 BAUD</div>
              </div>

              {/* Fake Robot State Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                  <div className="text-[#6A6A6A] text-xs font-orbitron mb-1 uppercase">Main Processor</div>
                  <div className="text-white font-mono text-sm flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-[#E67E22]" /> ATmega328P
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                  <div className="text-[#6A6A6A] text-xs font-orbitron mb-1 uppercase">System Power</div>
                  <div className="text-white font-mono text-sm flex items-center gap-1.5">
                    <Battery className="w-4 h-4 text-[#E67E22] fill-[#E67E22]/20" /> 7.4V (2S Li-ion)
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                  <div className="text-[#6A6A6A] text-xs font-orbitron mb-1 uppercase">Bluetooth Link</div>
                  <div className="text-white font-mono text-sm flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> HC-05 Classic
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                  <div className="text-[#6A6A6A] text-xs font-orbitron mb-1 uppercase">Obstacle Probe</div>
                  <div className="text-white font-mono text-sm flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#E67E22]" /> HC-SR04 (40kHz)
                  </div>
                </div>
              </div>

              {/* Featured Robot Car Photo Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#2A2A2A] shadow-inner bg-[#080808]">
                <img 
                  src="/assets/images/robot.jpg" 
                  alt="RoboNex Hardware Prototype" 
                  className="w-full h-48 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="px-2 py-1 bg-black/75 rounded text-[10px] font-mono text-white tracking-widest uppercase border border-[#2A2A2A]">
                    Prototype: V1.0.4
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* PROJECT ABSTRACT SECTION */}
      <section id="abstract" className="py-20 bg-[#0A0A0A] border-y border-[#1A1A1A] px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-8 text-center uppercase tracking-wider">
              Project <span className="text-[#E67E22]">Abstract</span>
            </h2>
            
            <div className="bg-[#121212] p-8 md:p-12 rounded-2xl border border-[#2A2A2A] relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#E67E22]/5 rounded-full blur-2xl"></div>
              
              <p className="text-[#8A8A8A] text-base md:text-lg leading-relaxed mb-6">
                The rapid advancement of embedded systems and wireless communication technologies has enabled the development of intelligent, remotely controlled robotic platforms. This project, titled <strong>"Multi-Function Robot Car Using Arduino UNO,"</strong> implements a cost-effective, multi-mode mobile robot capable of operating in three distinct modes: <strong>Autonomous Obstacle Avoidance</strong>, <strong>Bluetooth Manual Control</strong>, and <strong>Voice Control Override</strong>—all integrated into a single embedded platform.
              </p>
              <p className="text-[#8A8A8A] text-base md:text-lg leading-relaxed mb-6">
                The system is centered around an <strong>Arduino UNO</strong> microcontroller and utilizes an <strong>L293D Motor Driver Shield</strong> to drive four high-torque DC gear motors. Environmental mapping is conducted via an <strong>HC-SR04 Ultrasonic Sensor</strong> mounted on an <strong>SG90 Servo Motor</strong> for active field-of-view scanning. Wireless telemetry and app communication are achieved through an <strong>HC-05 Classic Bluetooth Module</strong> linked to a custom Android application.
              </p>
              <p className="text-[#8A8A8A] text-base md:text-lg leading-relaxed">
                The final system demonstrates advanced principles of sensor fusion, wireless control, and safety-override software loops. It offers a practical foundation for coursework in autonomous navigation, robotics, and human-machine interfaces.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CORE MODES OVERVIEW */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-4 uppercase tracking-wider">
              System <span className="text-[#E67E22]">Operating Modes</span>
            </h2>
            <p className="text-[#8A8A8A] max-w-2xl mx-auto">
              RoboNex switches control loops based on configuration bytes sent via serial or hardcoded directives.
            </p>
          </div>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8 h-full hover:border-[#E67E22]/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#E67E22]/5 rounded-bl-3xl"></div>
              <div className="w-14 h-14 bg-[#E67E22]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-7 h-7 text-[#E67E22]" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Obstacle Avoidance</h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4">
                Fully autonomous navigation loop. The robot scans the frontal environment. If an obstacle is detected within 12cm, the robot stops, reverses slightly, sweeps left/right using the SG90 servo, and drives toward the clearest path.
              </p>
              <div className="text-xs font-mono text-[#E67E22] bg-[#E67E22]/5 px-2 py-1 rounded inline-block">
                Ultrasonic loop: 40kHz ping
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8 h-full hover:border-[#E67E22]/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#E67E22]/5 rounded-bl-3xl"></div>
              <div className="w-14 h-14 bg-[#E67E22]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-[#E67E22]" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Bluetooth Manual</h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4">
                Manual telemetry control. Handled using a custom Android application transmitting character instructions ('F', 'B', 'L', 'R', 'S') via HC-05 SPP profile at 9600 Baud. Permits precise direction corrections.
              </p>
              <div className="text-xs font-mono text-[#E67E22] bg-[#E67E22]/5 px-2 py-1 rounded inline-block">
                Serial Link: HC-05 RX/TX
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8 h-full hover:border-[#E67E22]/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#E67E22]/5 rounded-bl-3xl"></div>
              <div className="w-14 h-14 bg-[#E67E22]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7 text-[#E67E22]" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Voice Safety Control</h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4">
                Speech recognition control. Dictated via smartphone Speech-to-Text API. Includes an automated safety override: if the path has obstacles closer than 10cm, the robot will block turn commands to prevent crash damages.
              </p>
              <div className="text-xs font-mono text-[#E67E22] bg-[#E67E22]/5 px-2 py-1 rounded inline-block">
                {"Safety loop active (<=10cm override)"}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INTERACTIVE TELEMETRY & HARDWARE SIMULATOR */}
      <section id="simulator" className="py-20 bg-[#0B0B0B] border-y border-[#1A1A1A] px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-4 uppercase tracking-wider">
                RoboNex <span className="text-[#E67E22]">Interactive Console</span>
              </h2>
              <p className="text-[#8A8A8A] max-w-2xl mx-auto">
                Test the hardware and firmware algorithms using our interactive 2D simulation console. Select a mode, manipulate the distance sensor slider, and send commands.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Control Panel (left 5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Mode Selectors */}
              <div className="bg-[#121212] p-5 rounded-2xl border border-[#2A2A2A]">
                <h3 className="text-sm font-orbitron font-bold text-[#E67E22] uppercase tracking-wider mb-4">Select Firmware Mode</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleModeChange('obstacle')}
                    className={`px-4 py-3 rounded-lg font-orbitron text-left text-sm font-bold transition-colors flex items-center justify-between ${activeSimMode === 'obstacle' ? 'bg-[#E67E22] text-black' : 'bg-[#1A1A1A] hover:bg-[#222] text-white'}`}
                  >
                    <span>1. Autonomous Obstacle Avoidance</span>
                    <ShieldAlert className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleModeChange('bluetooth')}
                    className={`px-4 py-3 rounded-lg font-orbitron text-left text-sm font-bold transition-colors flex items-center justify-between ${activeSimMode === 'bluetooth' ? 'bg-[#E67E22] text-black' : 'bg-[#1A1A1A] hover:bg-[#222] text-white'}`}
                  >
                    <span>2. Bluetooth Manual Drive</span>
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleModeChange('voice')}
                    className={`px-4 py-3 rounded-lg font-orbitron text-left text-sm font-bold transition-colors flex items-center justify-between ${activeSimMode === 'voice' ? 'bg-[#E67E22] text-black' : 'bg-[#1A1A1A] hover:bg-[#222] text-white'}`}
                  >
                    <span>3. Voice Control Safety Check</span>
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Inputs depending on mode */}
              <div className="bg-[#121212] p-5 rounded-2xl border border-[#2A2A2A] flex-grow">
                <h3 className="text-sm font-orbitron font-bold text-[#E67E22] uppercase tracking-wider mb-4">Sensor & Input Stimulator</h3>
                
                {/* Distance Slider: Always available since HC-SR04 reads distance continuously */}
                <div className="mb-6 bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-orbitron uppercase text-[#8A8A8A] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Sensor Distance (cm)
                    </label>
                    <span className={`font-mono font-bold text-sm ${simDistance <= 12 ? 'text-red-500 animate-pulse' : simDistance <= 20 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                      {simDistance} cm
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    value={simDistance} 
                    onChange={(e) => setSimDistance(parseInt(e.target.value))}
                    disabled={isSimRunning && activeSimMode === 'obstacle'}
                    className="w-full accent-[#E67E22] bg-[#222] h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#555] mt-1.5">
                    <span>5cm (Minimum)</span>
                    <span className="text-red-400 font-bold">12cm threshold</span>
                    <span>60cm</span>
                  </div>
                </div>

                {/* Bluetooth Telemetry Controls */}
                {activeSimMode === 'bluetooth' && (
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col items-center">
                    <span className="text-xs font-orbitron text-[#8A8A8A] uppercase mb-4">Virtual Joystick Panel</span>
                    <div className="grid grid-cols-3 gap-2 w-48">
                      <div></div>
                      <button 
                        onMouseDown={() => handleBluetoothCommand('F')}
                        onMouseUp={() => handleBluetoothCommand('S')}
                        onTouchStart={(e) => { e.preventDefault(); handleBluetoothCommand('F'); }}
                        onTouchEnd={(e) => { e.preventDefault(); handleBluetoothCommand('S'); }}
                        className="p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex justify-center active:scale-95 touch-none"
                      >
                        ▲
                      </button>
                      <div></div>
                      
                      <button 
                        onMouseDown={() => handleBluetoothCommand('L')}
                        onMouseUp={() => handleBluetoothCommand('S')}
                        onTouchStart={(e) => { e.preventDefault(); handleBluetoothCommand('L'); }}
                        onTouchEnd={(e) => { e.preventDefault(); handleBluetoothCommand('S'); }}
                        className="p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex justify-center active:scale-95 touch-none"
                      >
                        ◀
                      </button>
                      <button 
                        onClick={() => handleBluetoothCommand('S')}
                        onTouchStart={(e) => { e.preventDefault(); handleBluetoothCommand('S'); }}
                        className="p-3 bg-[#C0392B] text-white rounded-lg hover:bg-red-500 transition-colors flex justify-center active:scale-95 text-xs font-bold touch-none"
                      >
                        STOP
                      </button>
                      <button 
                        onMouseDown={() => handleBluetoothCommand('R')}
                        onMouseUp={() => handleBluetoothCommand('S')}
                        onTouchStart={(e) => { e.preventDefault(); handleBluetoothCommand('R'); }}
                        onTouchEnd={(e) => { e.preventDefault(); handleBluetoothCommand('S'); }}
                        className="p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex justify-center active:scale-95 touch-none"
                      >
                        ▶
                      </button>
                      
                      <div></div>
                      <button 
                        onMouseDown={() => handleBluetoothCommand('B')}
                        onMouseUp={() => handleBluetoothCommand('S')}
                        onTouchStart={(e) => { e.preventDefault(); handleBluetoothCommand('B'); }}
                        onTouchEnd={(e) => { e.preventDefault(); handleBluetoothCommand('S'); }}
                        className="p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex justify-center active:scale-95 touch-none"
                      >
                        ▼
                      </button>
                      <div></div>
                    </div>
                    <p className="text-[10px] text-[#555] font-mono mt-4 text-center">Click and hold directions to transmit; release to send Stop byte (S).</p>
                  </div>
                )}

                {/* Voice Control Controls */}
                {activeSimMode === 'voice' && (
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                    <span className="text-xs font-orbitron text-[#8A8A8A] uppercase block mb-3 text-center">Send Voice Instructions</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleVoiceCommand('GO')}
                        className="px-3 py-2 bg-[#2A2A2A] text-white text-xs font-orbitron font-bold rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5 text-[#E67E22]" /> "GO" (Forward)
                      </button>
                      <button 
                        onClick={() => handleVoiceCommand('STOP')}
                        className="px-3 py-2 bg-[#2A2A2A] text-white text-xs font-orbitron font-bold rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5 text-red-500" /> "STOP"
                      </button>
                      <button 
                        onClick={() => handleVoiceCommand('LEFT')}
                        className="px-3 py-2 bg-[#2A2A2A] text-white text-xs font-orbitron font-bold rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5 text-[#E67E22]" /> "LEFT"
                      </button>
                      <button 
                        onClick={() => handleVoiceCommand('RIGHT')}
                        className="px-3 py-2 bg-[#2A2A2A] text-white text-xs font-orbitron font-bold rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5 text-[#E67E22]" /> "RIGHT"
                      </button>
                      <button 
                        onClick={() => handleVoiceCommand('BACK')}
                        className="col-span-2 px-3 py-2 bg-[#2A2A2A] text-white text-xs font-orbitron font-bold rounded-lg hover:bg-[#E67E22] hover:text-black transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5 text-[#E67E22]" /> "BACK" (Backward)
                      </button>
                    </div>
                  </div>
                )}

                {activeSimMode === 'obstacle' && (
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] text-center text-xs text-[#8A8A8A]">
                    <p className="leading-relaxed">
                      <strong>Autonomous Loop Info:</strong> Set the distance below 12cm to trigger the auto-routing loop. The visualizer will trace the servo sweep and motor direction decisions automatically.
                    </p>
                  </div>
                )}

                <button 
                  onClick={resetSimulator} 
                  className="w-full mt-4 py-2 border border-zinc-700 rounded-lg hover:border-white text-white font-orbitron text-xs transition-colors"
                >
                  Reset Telemetry Logs
                </button>
              </div>

            </div>

            {/* Simulated 2D Output Visualizer (right 7 columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Main Visualizer Board */}
              <div className="bg-[#121212] p-6 rounded-2xl border border-[#2A2A2A] flex flex-col items-center justify-between min-h-[360px] relative overflow-hidden">
                {/* Radar Grid Graphic */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#E67E22]/10 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-[#E67E22]/5 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#E67E22]/10 pointer-events-none"></div>
                
                {/* Mode Tag */}
                <div className="w-full flex justify-between items-center mb-6 z-10">
                  <div className="font-mono text-xs text-[#8A8A8A]">
                    ACTION STATUS: <span className="text-[#E67E22] font-bold">{currentAction}</span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                    {activeSimMode} Mode
                  </div>
                </div>

                {/* 2D Robot Drawing */}
                <div className="relative w-48 h-64 bg-[#1A1A1A] border-2 border-[#333] rounded-3xl z-10 flex items-center justify-center shadow-lg">
                  {/* Front scanning sensor placeholder */}
                  <div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center transition-transform duration-500 origin-center"
                    style={{ transform: `translateX(-50%) rotate(${simServoAngle - 90}deg)` }}
                  >
                    {/* Tiny servo box */}
                    <div className="w-6 h-6 bg-blue-600 rounded border border-blue-500"></div>
                    {/* Ultrasonic eyes */}
                    <div className="w-12 h-5 bg-zinc-700 rounded-full border border-zinc-600 flex justify-around items-center px-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      </div>
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      </div>
                    </div>
                    {/* Cone Range Overlay */}
                    <div 
                      className={`absolute bottom-5 w-40 h-28 pointer-events-none rounded-t-full origin-bottom -translate-y-8 flex justify-center items-center text-[10px] font-bold font-mono transition-colors ${simDistance <= 12 ? 'bg-red-500/10 border-t border-red-500/30 text-red-400' : simDistance <= 20 ? 'bg-yellow-500/10 border-t border-yellow-500/30 text-yellow-400' : 'bg-emerald-500/10 border-t border-emerald-500/30 text-emerald-400'}`}
                      style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
                    >
                      <span className="relative -top-6">{simDistance} cm</span>
                    </div>
                  </div>

                  {/* Wheel FL */}
                  <div className={`absolute top-4 -left-6 w-5 h-12 bg-zinc-800 rounded-md border-2 transition-colors ${motors.fl === 'forward' ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : motors.fl === 'backward' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-zinc-700'}`}>
                    <div className="w-full h-full flex flex-col justify-around py-1 overflow-hidden">
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.fl !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.fl !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.fl !== 'stop' ? 'animate-pulse' : ''}`}></div>
                    </div>
                  </div>

                  {/* Wheel FR */}
                  <div className={`absolute top-4 -right-6 w-5 h-12 bg-zinc-800 rounded-md border-2 transition-colors ${motors.fr === 'forward' ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : motors.fr === 'backward' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-zinc-700'}`}>
                    <div className="w-full h-full flex flex-col justify-around py-1 overflow-hidden">
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.fr !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.fr !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.fr !== 'stop' ? 'animate-pulse' : ''}`}></div>
                    </div>
                  </div>

                  {/* Wheel RL */}
                  <div className={`absolute bottom-4 -left-6 w-5 h-12 bg-zinc-800 rounded-md border-2 transition-colors ${motors.rl === 'forward' ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : motors.rl === 'backward' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-zinc-700'}`}>
                    <div className="w-full h-full flex flex-col justify-around py-1 overflow-hidden">
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.rl !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.rl !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.rl !== 'stop' ? 'animate-pulse' : ''}`}></div>
                    </div>
                  </div>

                  {/* Wheel RR */}
                  <div className={`absolute bottom-4 -right-6 w-5 h-12 bg-zinc-800 rounded-md border-2 transition-colors ${motors.rr === 'forward' ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : motors.rr === 'backward' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-zinc-700'}`}>
                    <div className="w-full h-full flex flex-col justify-around py-1 overflow-hidden">
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.rr !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.rr !== 'stop' ? 'animate-pulse' : ''}`}></div>
                      <div className={`w-full h-0.5 bg-zinc-600 ${motors.rr !== 'stop' ? 'animate-pulse' : ''}`}></div>
                    </div>
                  </div>

                  {/* Arduino PCB Board Details */}
                  <div className="w-32 h-44 bg-[#0D3B2E] border border-emerald-500/30 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[8px] text-emerald-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/10 border-l border-b border-amber-500/20 flex items-center justify-center font-bold text-amber-500">UNO</div>
                    <div>
                      <div className="font-bold text-white mb-0.5">ARDUINO UNO R3</div>
                      <div>RESET: EN</div>
                      <div>MCU: ATmega328P</div>
                    </div>
                    {/* Simulated L293D Shield Layer */}
                    <div className="w-full h-18 bg-[#1A1A1A] border border-[#222] rounded flex flex-col justify-around p-1 text-[7px] text-[#888]">
                      <div className="text-white text-center font-orbitron font-bold scale-90">L293D MOTOR SHIELD</div>
                      <div className="flex justify-between px-1">
                        <span>M1 [FL]</span>
                        <span>M2 [FR]</span>
                      </div>
                      <div className="flex justify-between px-1">
                        <span>M3 [RL]</span>
                        <span>M4 [RR]</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dial Indicator Stats */}
                <div className="w-full mt-6 grid grid-cols-3 gap-2">
                  <div className="bg-[#1A1A1A] p-2.5 rounded-lg border border-[#2A2A2A] text-center">
                    <span className="text-[10px] text-[#6A6A6A] font-orbitron block">SERVO ANGLE</span>
                    <span className="text-white font-mono text-sm font-bold">{simServoAngle}°</span>
                  </div>
                  <div className="bg-[#1A1A1A] p-2.5 rounded-lg border border-[#2A2A2A] text-center">
                    <span className="text-[10px] text-[#6A6A6A] font-orbitron block">WHEEL DRIVE</span>
                    <span className="text-white font-mono text-sm font-bold uppercase">
                      {motors.fl === 'forward' ? 'Forward' : motors.fl === 'backward' ? 'Reverse' : motors.fl === 'backward' ? 'Left' : motors.fl === 'stop' ? 'Stop' : 'Turning'}
                    </span>
                  </div>
                  <div className="bg-[#1A1A1A] p-2.5 rounded-lg border border-[#2A2A2A] text-center">
                    <span className="text-[10px] text-[#6A6A6A] font-orbitron block">VOLTAGE IN</span>
                    <span className="text-[#E67E22] font-mono text-sm font-bold">7.42 V</span>
                  </div>
                </div>

              </div>

              {/* Console Logs Terminal */}
              <div className="bg-[#080808] border border-[#2A2A2A] rounded-2xl p-5 flex flex-col h-48">
                <div className="flex items-center gap-2 mb-3 border-b border-[#1A1A1A] pb-2 shrink-0">
                  <Terminal className="w-4 h-4 text-[#E67E22]" />
                  <span className="font-orbitron text-xs font-bold text-white tracking-widest">SERIAL MONITOR LOGS</span>
                </div>
                <div className="flex-grow overflow-y-auto space-y-1.5 font-mono text-xs text-[#8A8A8A] pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                  {simLogs.map((log, index) => (
                    <div key={index} className={log.includes('[SYSTEM]') ? 'text-cyan-400' : log.includes('[OBSTACLE]') || log.includes('[SAFETY]') ? 'text-red-400' : log.includes('[DECISION]') ? 'text-yellow-400' : 'text-zinc-400'}>
                      {log}
                    </div>
                  ))}
                  <div ref={logsEndRef}></div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* DETAILED WIRING AND PINOUT CHEAT-SHEET */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-4 uppercase tracking-wider">
              Wiring & <span className="text-[#E67E22]">Pinout Mapping</span>
            </h2>
            <p className="text-[#8A8A8A] max-w-2xl mx-auto">
              Comprehensive hardware connection layout representing the microcontroller interface config.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          {/* Mobile swipe helper */}
          <div className="flex items-center gap-1.5 justify-center md:hidden mb-3 text-[10px] font-mono text-[#E67E22] animate-pulse">
            <span>← Swipe table horizontally to view full layout details →</span>
          </div>
          <div className="bg-[#121212] rounded-2xl border border-[#2A2A2A] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#8A8A8A] uppercase bg-[#1A1A1A] font-orbitron border-b border-[#2A2A2A]">
                  <tr>
                    <th className="px-6 py-4">Source Component</th>
                    <th className="px-6 py-4">Component Pin</th>
                    <th className="px-6 py-4">Arduino / Shield Pin</th>
                    <th className="px-6 py-4">Function Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">HC-SR04 Ultrasonic Sensor</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">Trig</td>
                    <td className="px-6 py-4 font-mono text-white">Analog Pin A1</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Trigger output pulse to start 40kHz sonic measurement burst.</td>
                  </tr>
                  <tr className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">HC-SR04 Ultrasonic Sensor</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">Echo</td>
                    <td className="px-6 py-4 font-mono text-white">Analog Pin A0</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Echo input pulse representing Time-of-Flight duration.</td>
                  </tr>
                  <tr className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">SG90 Servo Motor</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">PWM Signal (Orange)</td>
                    <td className="px-6 py-4 font-mono text-white">Digital PWM Pin 10</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Angular positional sweep commands (20° to 180°).</td>
                  </tr>
                  <tr className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">HC-05 Bluetooth Module</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">TXD (Transmit)</td>
                    <td className="px-6 py-4 font-mono text-white">RX (Pin 0)</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Sends data bytes received wirelessly from Android to Arduino RX.</td>
                  </tr>
                  <tr className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">HC-05 Bluetooth Module</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">RXD (Receive)</td>
                    <td className="px-6 py-4 font-mono text-white">TX (Pin 1)</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Receives serial log transmissions from Arduino TX to phone.</td>
                  </tr>
                  <tr className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">4 × DC Gear Motors</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">Power Wires</td>
                    <td className="px-6 py-4 font-mono text-white">L293D Shield (M1-M4)</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Bi-directional H-Bridge power drive for wheels.</td>
                  </tr>
                  <tr className="hover:bg-[#1A1A1A]/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">Common Power Rails</td>
                    <td className="px-6 py-4 font-mono text-[#E67E22]">VCC & GND</td>
                    <td className="px-6 py-4 font-mono text-white">5V Output & GND</td>
                    <td className="px-6 py-4 text-[#8A8A8A]">Power distribution from Arduino LDO regulator to logic circuits.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* TEAM PROFILE GALLERY SECTION */}
      <section className="py-24 bg-[#0A0A0A] border-t border-[#1A1A1A] px-6">
        <div className="max-w-6xl mx-auto">
          
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-4 uppercase tracking-wider">
                Project <span className="text-[#E67E22]">Engineers</span>
              </h2>
              <p className="text-[#8A8A8A] max-w-2xl mx-auto">
                6th Semester Students, Department of Electrical Engineering, Chirang Polytechnic.
              </p>
            </div>
          </FadeIn>

          {/* Students Grid - 2 Column on mobile, 3 Column on large screens */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-24">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.1}>
                <div className="bg-[#121212] border border-[#2A2A2A] rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#E67E22]/50 transition-colors h-full flex flex-col">
                  {/* Photo container */}
                  <div className="relative h-32 sm:h-52 md:h-64 bg-[#1A1A1A] overflow-hidden">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                      <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-black/85 rounded text-[7px] sm:text-[10px] font-mono text-[#E67E22] tracking-wider uppercase border border-[#E67E22]/20">
                        {member.roll}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <div className="p-3 sm:p-5 md:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-base md:text-lg font-orbitron font-bold text-white mb-0.5 sm:mb-1">{member.name}</h3>
                      <span className="text-[8px] sm:text-xs font-orbitron text-[#E67E22] block mb-2 sm:mb-4 uppercase tracking-wider">{member.role}</span>
                      <p className="text-[10px] sm:text-sm text-[#8A8A8A] leading-relaxed">{member.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-4 uppercase tracking-wider">
                Project <span className="text-[#E67E22]">Advisors</span>
              </h2>
              <p className="text-[#8A8A8A] max-w-2xl mx-auto">
                Academics facilitating technical review coordinates for the design prototype.
              </p>
            </div>
          </FadeIn>

          {/* Advisors Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <FadeIn key={advisor.name} delay={index * 0.1}>
                <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#E67E22]/50 transition-colors p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                  
                  {/* Photo */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#E67E22]/30 shrink-0 bg-[#1A1A1A]">
                    <img 
                      src={advisor.img} 
                      alt={advisor.name} 
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  {/* Details */}
                  <div className="text-center sm:text-left flex-grow">
                    <span className="px-2.5 py-0.5 bg-[#E67E22]/10 border border-[#E67E22]/30 rounded text-[8px] sm:text-[9px] font-orbitron font-bold text-[#E67E22] uppercase tracking-widest inline-block mb-2">
                      {advisor.role}
                    </span>
                    <h3 className="text-base sm:text-xl font-orbitron font-bold text-white mb-0.5 sm:mb-1">{advisor.name}</h3>
                    <span className="text-[10px] sm:text-xs text-[#6A6A6A] font-orbitron block mb-2 sm:mb-3 uppercase">{advisor.title}</span>
                    <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">{advisor.desc}</p>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* WATCH DEMO IFRAME PLACEHOLDER */}
      <section id="demo" className="py-24 bg-[#080808] border-t border-[#1A1A1A] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-black mb-6 uppercase tracking-wider">
              Project <span className="text-[#E67E22]">Video Demo</span>
            </h2>
            <p className="text-[#8A8A8A] mb-12 max-w-xl mx-auto">
              Watch RoboNex in action performing real-world autonomous path-finding maneuvers, manual Bluetooth joystick navigation, and safety override protocols.
            </p>
            
            <div className="aspect-video bg-[#121212] border-2 border-[#2A2A2A] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl">
              <div className="absolute inset-0 bg-[url('/assets/images/robot.jpg')] bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity blur-sm"></div>
              <div className="absolute inset-0 bg-black/60"></div>
              
              <div className="w-20 h-20 bg-[#E67E22] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_35px_rgba(230,126,34,0.4)]">
                <Play className="w-8 h-8 text-black ml-1 fill-black" />
              </div>
              <span className="relative z-10 mt-6 font-orbitron font-bold tracking-widest text-[#E67E22] text-sm uppercase">
                Play Demonstration Recording
              </span>
              <p className="relative z-10 text-xs text-[#555] font-mono mt-1">RoboNex_Sweep_Modes.mp4 (4.2 MB)</p>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};

export default Home;

