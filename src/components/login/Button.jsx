import styles from './FormLogin.module.css'
export function Button({textButton, handler}) {

    return(
        <button onClick = { handler } className = { styles.entrarButton }  > <span className={`${styles.spanText} ${styles.spanText2}`}> {textButton}  </span></button>  
    )
}
