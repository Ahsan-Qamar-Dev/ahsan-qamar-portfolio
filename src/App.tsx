import { useEffect, useLayoutEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';
import CvPage from './pages/CvPage';
const titles: Record<string, string> = {'/': 'Mobile, ML & thoughtfully built software', '/about': 'About', '/experience': 'Experience & education', '/projects': 'Projects', '/cv': 'CV preview & download'};
function Portfolio() {
  const location = useLocation();
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme !== 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('aq-theme', dark ? 'dark' : 'light'); } catch { /* Theme works without storage. */ }
  }, [dark]);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `Ahsan Qamar — ${titles[location.pathname] ?? 'Page not found'}`;
  }, [location.pathname]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="page-shell" id="top">
      <Navigation dark={dark} onToggle={() => setDark(!dark)} />
      <div className="route-content" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <footer>
        <Link to="/" className="footer-name">Ahsan Qamar<span>© {new Date().getFullYear()}</span></Link>
        <span className="footer-note">Made with intention. Built with curiosity.</span>
        <a href="#top" className="back-top">Back to top <ArrowUp size={16} /></a>
      </footer>
    </div>
  </>;
}
export default function App() { return <BrowserRouter><Portfolio /></BrowserRouter>; }
