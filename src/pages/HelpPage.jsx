import '../global.css';
import { Header } from '../components/Header';
import { Faq } from '../components/help-page/faq';
import { CommonIssues } from '../components/help-page/common-issues';
import { StepByStepGuides } from '../components/help-page/step-by-step-guides';
import { useRef } from 'react';
import styles from './HelpPage.module.css';

export function HelpPage() {
  const faqRef = useRef(null);
  const commonIssuesRef = useRef(null);
  const stepByStepGuidesRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mainPageRef">
      <Header/>
      <div className={styles.helpContainer}>
        {/* <nav className={styles.tableOfContents}>
          <ul>
            <li onClick={() => scrollToSection(faqRef)}>FAQ - Perguntas Frequentes</li>
            <li onClick={() => scrollToSection(commonIssuesRef)}>Problemas Comuns</li>
            <li onClick={() => scrollToSection(stepByStepGuidesRef)}>Guias Passo-a-Passo</li>
          </ul>
        </nav> */}
        <div className={styles.mainPageContent}>
          <div ref={faqRef}>
            <Faq />
          </div>
          <div ref={commonIssuesRef}>
            <CommonIssues />
          </div>
          {/* <div ref={stepByStepGuidesRef}>
            <StepByStepGuides />
          </div> */}
        </div>
      </div>
    </div>
  );
}