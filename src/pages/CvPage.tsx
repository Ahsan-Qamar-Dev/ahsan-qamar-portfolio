import { ArrowUpRight, Download } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import { profile } from '../data/portfolio';

export default function CvPage() {
  return <main id="main">
    <PageIntro number="04" label="CURRICULUM VITAE" title={<>My experience,<br /><em>on paper.</em></>} description="Preview my CV below, then download a copy as a PDF." />
    <section className="cv-preview-section" aria-label="CV preview and download">
      <div className="cv-preview-toolbar">
        <div><h2>Ahsan Qamar</h2><p>Curriculum vitae · PDF</p></div>
        <a className="button-primary" href={profile.cv!} download="Ahsan-Qamar-CV.pdf"><Download size={18} /> Download PDF</a>
      </div>
      <p className="cv-preview-help">This preview shows the original CV. You can also <a href={profile.cv!} target="_blank" rel="noopener noreferrer">open the PDF in a new tab <ArrowUpRight size={13} /></a> to read its selectable text.</p>
      <img className="cv-preview" src="/images/cv-preview.png" alt="Preview of Ahsan Qamar’s one-page CV. Open the PDF for selectable text and accessible document content." width="1530" height="1980" />
    </section>
  </main>;
}
