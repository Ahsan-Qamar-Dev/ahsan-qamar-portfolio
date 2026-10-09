import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import ProjectCard from '../components/ProjectCard';
import ContactBanner from '../components/ContactBanner';
import { explorations, profile, projects } from '../data/portfolio';
const filters = ['All projects', 'Mobile', 'AI & data', 'Web & backend'] as const;
type Filter = (typeof filters)[number];
export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('All projects');
  const visible = projects.filter(project => filter === 'All projects' || (filter === 'Mobile' && ['coffee','study'].includes(project.kind)) || (filter === 'AI & data' && ['data','ml'].includes(project.kind)) || (filter === 'Web & backend' && ['api','todo'].includes(project.kind)));
  return <main id="main">
    <PageIntro number="03" label="FROM IDEA TO REPOSITORY" title={<>A collection of<br /><em>curious work.</em></>} description="Mobile experiences, machine learning experiments, and tools for the web. Every project here links straight to its public GitHub repository." />
    <div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} className={filter===item ? 'selected' : ''} aria-pressed={filter===item} onClick={()=>setFilter(item)}>{item}{item==='All projects' && <span>{projects.length}</span>}</button>)}</div><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub profile <ArrowUpRight size={15} /></a></div>
    <div className="project-results" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'} · {filter}</div>
    <div className="projects-grid full-projects">{visible.map(project => <ProjectCard key={project.repo} project={project} index={projects.indexOf(project)} />)}</div>
    <a className="profile-repo" href={`${profile.github}/Ahsan-Qamar-Dev`} target="_blank" rel="noreferrer"><div className="profile-repo-icon"><Github size={27} /></div><div><span className="eyebrow">THE SEVENTH REPOSITORY / PROFILE README</span><h3>Ahsan-Qamar-Dev</h3><p>The introduction behind the code — my GitHub profile, skills, and project notes.</p></div><ArrowUpRight size={24} /></a>
    <section className="section" data-reveal><div className="section-heading"><h2>Beyond the <em>repos.</em></h2><span className="eyebrow">MORE EXPLORATIONS</span></div><p className="section-description">A few more projects shared on my profile, from generative AI to full-stack development.</p><div className="exploration-cards">{explorations.map((item,index) => <article key={item.title}><span className="eyebrow">0{index+1} / EXPERIMENT</span><h3>{item.title}</h3><p>{item.detail}</p><a className="text-link" href={item.link ?? `${profile.github}/Ahsan-Qamar-Dev`} target="_blank" rel="noreferrer">{item.link ? 'View notebook' : 'Read on my profile'}<ArrowUpRight size={14} /></a></article>)}</div></section>
    <ContactBanner />
  </main>;
}
