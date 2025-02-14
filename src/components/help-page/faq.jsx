import styles from "./faq.module.css";

export function Faq() {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.reaTitle}>FAQ</h1>
                <p className={styles.reaTitleDesk}>- Perguntas frequentes</p>
            </div>
            <div className={styles.FaqContent}>
                
            </div>
        </div>
    );
}