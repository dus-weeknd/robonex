import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hardware from './pages/Hardware';
import Software from './pages/Software';
import Results from './pages/Results';
import Resources from './pages/Resources';

// Automatically scroll to top or target hash anchor on route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080808] text-[#F0F0F0] font-sans selection:bg-[#E67E22] selection:text-white flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/software" element={<Software />} />
            <Route path="/results" element={<Results />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
