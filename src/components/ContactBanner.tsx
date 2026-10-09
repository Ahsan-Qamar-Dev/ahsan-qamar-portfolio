import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import { profile } from '../data/portfolio';
export default function ContactBanner() {
  return <section className="inner-contact" data-reveal><div><span className="eyebrow">LET’S CONNECT</span><h2>Something in <em>mind?</em></h2><p>Let’s talk about what we could build together.</p><a className="public-email" href={`mailto:${profile.email}`}>{profile.email}</a></div><div><a className="button-primary" href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={18} /></a><Link className="text-link" to="/cv"><FileText size={15} /> Preview CV</Link></div></section>;
}
