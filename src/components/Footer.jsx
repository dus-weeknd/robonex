import React from 'react';
import { Mail, BookOpen, FileText, Presentation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#080808] border-t border-[#1A1A1A] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-[#E67E22] overflow-hidden">
                <img src="/assets/images/college_logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl text-white">CHIRANG POLYTECHNIC</h3>
                <p className="text-xs text-[#E67E22] font-orbitron tracking-widest">DEPT. OF ELECTRICAL ENGINEERING</p>
              </div>
            </div>
            <p className="text-[#8A8A8A] max-w-sm">
              Project developed under the guidance of Ms. Chinmayee Medhi and H.O.D Mr. Amit Kumar Das.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono">
              <Link to="/resources" className="text-[#8A8A8A] hover:text-[#E67E22] transition-all flex items-center gap-1.5 border border-[#1A1A1A] hover:border-[#E67E22]/30 px-3 py-1.5 rounded bg-black/40">
                <BookOpen className="w-3.5 h-3.5 text-[#E67E22]" /> Documentation
              </Link>
              <a 
                href="/assets/files/MULTI-FUNCTION ROBOT CAR USING ARDUINO UNO.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8A8A8A] hover:text-[#E67E22] transition-all flex items-center gap-1.5 border border-[#1A1A1A] hover:border-[#E67E22]/30 px-3 py-1.5 rounded bg-black/40"
              >
                <FileText className="w-3.5 h-3.5 text-[#E67E22]" /> View Report
              </a>
              <a 
                href="/assets/files/PPT - MULTI-FUNCTION ROBOT CAR USING ARDUINO UNO.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8A8A8A] hover:text-[#E67E22] transition-all flex items-center gap-1.5 border border-[#1A1A1A] hover:border-[#E67E22]/30 px-3 py-1.5 rounded bg-black/40"
              >
                <Presentation className="w-3.5 h-3.5 text-[#E67E22]" /> View Presentation
              </a>
            </div>
          </div>
          
          <div className="md:text-right">
            <h4 className="font-orbitron font-bold text-lg mb-6 text-white">Project Team (6th Sem)</h4>
            <div className="flex flex-wrap md:justify-end gap-3 mb-6">
              {[
                'Dus Mamud (CHP/23/EL/020)', 
                'Iswar Ch. Das (CHP/23/EL/025)', 
                'Bhardwaj Sarkar (CHP/23/EL/008)', 
                'Anup Das (CHP/23/EL/005)', 
                'Dibyajyoti Das (CHP/23/EL/016)', 
                'Nazrul Islam (CHP/23/EL/046)',
                'Sourabh Sarkar (CHP/23/EL/059)'
              ].map((name) => (
                <span key={name} className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-xs font-mono text-[#F0F0F0]">
                  {name}
                </span>
              ))}
            </div>
            <a href="mailto:robotcar.chp23el@proton.me" className="inline-flex items-center gap-2 text-[#E67E22] hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              robotcar.chp23el@proton.me
            </a>
          </div>
        </div>
        
        <div className="text-center text-[#4A4A4A] text-sm pt-8 border-t border-[#1A1A1A]">
          &copy; {new Date().getFullYear()} RoboNex Project Team. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
