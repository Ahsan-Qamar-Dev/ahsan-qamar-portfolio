import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { profile } from '../data/portfolio';
const links = [{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Projects', to: '/projects' }, { label: 'Experience', to: '/experience' }, { label: 'CV', to: '/cv' }];
export default function Navigation({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return <header className="site-header">
    <Link className="wordmark" to="/" aria-label="Ahsan Qamar — home">AQ<span>.</span></Link>
    <nav id="primary-nav" className="navigation" aria-label="Main navigation">
      {links.map(link => <NavLink key={link.to} to={link.to} end>{link.label}</NavLink>)}
    </nav>
    <div className="header-actions">
      <button className="icon-button" onClick={onToggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
      <a className="pill contact-pill" href={`mailto:${profile.email}`} title={`Email ${profile.email}`} aria-label={`Let’s talk — email ${profile.email}`}>Let’s talk <ArrowUpRight size={15} /></a>
    </div>
  </header>;
}
