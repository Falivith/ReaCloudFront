import styles from './Recover.module.css'

export function Recover() {

    return(
        <div className={styles.container}>
            <p className={styles.titleText}>Redefinição de senha</p>
            <br></br>
            <p className={styles.normalText}>Informe o e-mail utilizado na criação da sua conta e enviaremos instruções para redefinir a sua senha!</p>
        </div>
    )


}