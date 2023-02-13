import googleLogo from '../assets/Google.png'
import styles from './FormLogin.module.css'

const styleImage = {"marginTop":"1rem",
                    "marginBottom":"0.75rem",
                    "width": "1.25rem",
                    "height": "1.25rem",
                    "marginRight": "0.4rem"
                }




export function FormLogin(){
    return(
    <div className= {styles.container}>
        <form > 
            <p className= {styles.text} > E-MAIL</p>
            <input className={styles.input} placeholder='exemplo@email.com'></input>
            <p className= {styles.text} > SENHA</p>
            <input className={styles.input}  placeholder='• • • • • • •' ></input>
            <div className={styles.containerForButtons}>
                <button className={styles.entrarButton}  > <span > ENTRAR  </span></button>
                <button className={styles.containerButtons}> <span className={styles.spanText} ><img src= {googleLogo} style = {styleImage}  /> ENTRAR COM O GOOGLE </span></button>
                <button className={styles.containerButtons}> <span className={styles.spanText} > CADASTRAR  </span></button>
            </div>
        </form>
    </div>  
    )
}