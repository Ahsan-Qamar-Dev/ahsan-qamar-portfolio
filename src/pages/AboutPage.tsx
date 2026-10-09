import { ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import SectionLabel from '../components/SectionLabel';
import ContactBanner from '../components/ContactBanner';
import { disciplines, profile } from '../data/portfolio';
export default function AboutPage() {
  return <main id="main">
    <PageIntro number="01" label="THE PERSON BEHIND THE PROJECTS" title={<>A little code.<br />A lot of <em>curiosity.</em></>} description="I’m Ahsan Qamar — a Computer Science student, a developer, and a believer in learning by building." />
    <section className="about-page-grid" data-reveal>
      <div className="about-photo"><img src={profile.portrait} alt="Ahsan Qamar wearing a suit" width="1122" height="1402" /><div className="photo-note"><span className="status-dot" /> Lahore, Pakistan<span>THAT’S ME, AHSAN.</span></div></div>
      <div className="about-story"><span className="eyebrow">HELLO, AGAIN.</span><h2>Making ideas<br /><em>feel real.</em></h2><p className="lead">I’m studying Computer Science at the University of Management and Technology in Lahore, with graduation expected in October 2027. Alongside my studies, I’m a Flutter and AI/ML intern at Big Brains.</p><p>I enjoy working across the software engineering spectrum: building cross-platform mobile applications, experimenting with deep learning and generative AI, and connecting interfaces to backend systems.</p><p>That curiosity has taken me from a coffee-ordering app and a student planner to traffic-sign recognition, manga-generation pipelines, and interactive data tools. Each project is a chance to ask better questions and build with more care.</p><div className="about-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={15} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={15} /></a></div><Link className="pill" to="/cv"><FileText size={15} /> Preview my CV</Link></div>
    </section>
    <section className="section" data-reveal><SectionLabel number="02">THE THINGS I WORK WITH</SectionLabel><div className="section-heading"><h2>My <em>toolkit.</em></h2><span className="eyebrow">ALWAYS EVOLVING</span></div><div className="toolkit-grid">{disciplines.map((item,index) => <article key={item.title}><span className="eyebrow">0{index+1} / {item.title.toUpperCase()}</span><h3>{item.title}</h3><p>{item.detail}</p><div className="tags">{item.tools.split(' · ').map(tool => <span key={tool}>{tool}</span>)}</div></article>)}</div><div className="foundation-row"><span className="eyebrow">ALSO IN THE MIX</span><p>C++ · OOP · Data structures & algorithms · Git & GitHub · AWS S3 · Qwen / Ollama · Stable Diffusion</p></div></section>
    <section className="about-next" data-reveal><span className="eyebrow">GET TO KNOW MY WORK</span><Link to="/experience">The journey so far <ArrowUpRight size={25} /></Link><Link to="/projects">Things I’ve built <ArrowUpRight size={25} /></Link></section>
    <ContactBanner />
  </main>;
}
