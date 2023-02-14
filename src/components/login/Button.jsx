import styles from './FormLogin.module.css'
export function Button({textButton}) {

    return(
        <button className={styles.entrarButton}  > <span className={`${styles.spanText} ${styles.spanText2}`}> {textButton}  </span></button>  
    )


}