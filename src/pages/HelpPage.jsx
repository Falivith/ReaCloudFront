import '../global.css';
import { Header } from '../components/Header';
import { Faq } from '../components/help-page/faq';
import { useRef } from 'react';
import styles from './HelpPage.module.css';

export function HelpPage() {
  const faqRef = useRef(null);
  const tutorialRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mainPageRef">
      <Header/>
      <div className={styles.helpContainer}>
        <nav className={styles.tableOfContents}>
          <h2>Índice</h2>
          <ul>
            <li onClick={() => scrollToSection(faqRef)}>FAQ</li>
          </ul>
        </nav>
        <div className={styles.mainPageContent}>
          <div ref={faqRef}>
            <Faq />
          </div>
        </div>
      </div>
    </div>
  );
}