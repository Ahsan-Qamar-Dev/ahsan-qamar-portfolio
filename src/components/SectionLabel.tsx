import type { ReactNode } from 'react';
export default function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}
