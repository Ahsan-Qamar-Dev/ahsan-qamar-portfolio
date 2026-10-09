import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
export default function NotFoundPage() {
  return <main id="main" className="not-found"><PageIntro number="404" label="A SMALL DETOUR" title={<>This page took<br />a wrong <em>turn.</em></>} description="Let’s get you back to the portfolio." /><Link className="button-primary" to="/">Back home <ArrowUpRight size={17} /></Link></main>;
}
