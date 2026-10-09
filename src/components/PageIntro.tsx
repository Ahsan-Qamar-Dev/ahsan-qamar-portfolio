import type { ReactNode } from 'react';
import SectionLabel from './SectionLabel';
export default function PageIntro({ number, label, title, description }: { number: string; label: string; title: ReactNode; description: string }) {
  return <section className="page-intro"><SectionLabel number={number}>{label}</SectionLabel><h1>{title}</h1><p>{description}</p></section>;
}
