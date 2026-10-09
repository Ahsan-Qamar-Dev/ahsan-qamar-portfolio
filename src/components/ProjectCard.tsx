import { ArrowUpRight, Github } from 'lucide-react';
import { profile, projects } from '../data/portfolio';
type Project = (typeof projects)[number];
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className={`project-card project-${project.kind}`}>
    <a className="project-art" href={`${profile.github}/${project.repo}`} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
      {project.kind === 'coffee' ? <><span className="art-eyebrow">A GOOD DAY STARTS HERE.</span><div className="coffee-title">A little coffee.<br /><em>A lot of care.</em></div><div className="phones"><img src="/images/coffee-home.png" alt="Coffee Shop app catalog in dark mode" loading="lazy" width="390" height="844" /><img src="/images/coffee-detail.png" alt="Coffee Shop product details in light mode" loading="lazy" width="390" height="844" /></div><span className="art-footer">COFFEE SHOP / FLUTTER APPLICATION</span></> :
      project.kind === 'study' ? <><span className="art-eyebrow">SPACE TO DO YOUR BEST WORK.</span><div className="study-word">Study<span>Flow</span><span className="study-star">✳</span></div><div className="study-visual"><span>ONE THING AT A TIME</span><div className="focus-ring"><span>25:00<small>time to focus</small></span></div><div className="study-line"><i /> A little progress, every day.</div></div><span className="art-footer">STUDENT PLANNER / UI IN DEVELOPMENT</span></> :
      <><span className="art-eyebrow">{project.category}</span><div className="data-art"><span className="data-logo">{project.kind === 'data' ? 'eda' : project.kind === 'ml' ? 'p(x)' : project.kind === 'api' ? '{ api }' : 'to do.'}<em>{project.kind === 'data' ? 'pro' : '↗'}</em></span><div className="bars" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div></div><span className="art-footer">{project.status.toUpperCase()}</span></>}
      <span className="art-link"><ArrowUpRight size={24} /></span>
    </a>
    <div className="project-info"><div className="eyebrow"><span>0{index + 1}</span> / {project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={`${profile.github}/${project.repo}`} target="_blank" rel="noreferrer"><Github size={15} /> Source code <ArrowUpRight size={14} /></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a>}</div><span className="project-status"><span className="status-dot" />{project.status}</span></div>
  </article>;
}
