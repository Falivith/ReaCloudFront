import googleLogo from '../../assets/Google.png'
import styles from './FormLogin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { LabelAndInput } from './LabelAndInput';
import { Button } from './Button';

import styleLabelandInput from './LabelAndInput.module.css'




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
 
            <LabelAndInput labelText={'E-MAIL'} inputType={"email"} placeholderText={'exemplo@email.com'} inputStyle = {styleLabelandInput.input}/>
            
            <LabelAndInput labelText={'SENHA'} inputType={"password"}  placeholderText={'• • • • • • •'} inputStyle = {styleLabelandInput.input}/>
            <div className={styles.containerForButtons}>
                <Button textButton={'ENTRAR'}/>
                <button className={styles.containerButtons}> <span className={styles.spanText} ><img src= {googleLogo} style = {styleImage}  /> ENTRAR COM O GOOGLE </span></button>
                <button className={styles.containerButtons}> <span className={styles.spanText} > CADASTRAR  </span></button>
            </div>
            <p className={styles.forgotPassword}>Esqueceu sua senha?&nbsp;<Link to={'../redefinir'} >Clique aqui</Link>  </p>
        </form>
    </div>  
    )
}