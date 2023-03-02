import styles from './Recover.module.css'
import { Header } from '../Header';
import { LabelAndInput } from './LabelAndInput';
import { Button } from './Button';
import React, { useState } from 'react';



export function Recover() {
    const [typePassword, setTypePassword] = useState(false);


    const buttonHandler = (event) =>{
        event.preventDefault();
        setTypePassword(true)
    }

    return(
        
        <div> <Header showAddRecurso = {false}/> 
            <div className={styles.container}>
                <p className={styles.titleText}>Redefinição de senha</p>
                <br></br>
                <p className={styles.normalText}>
                    {!typePassword ?
                    "Informe o e-mail utilizado na criação da sua conta e enviaremos instruções para redefinir a sua senha!"
                    :
                    "Escolha uma nova senha para a sua conta."
                    }
                </p>
                <form>
                    <LabelAndInput labelText={'E-MAIL'} inputType={"email"} placeholderText={'exemplo@email.com'}/>
                    <div className={styles.marginDiv}>
                    <Button  handler= {buttonHandler}textButton={'ENVIAR'} class2={styles.spanText2} />
                    </div>
                </form>
            </div>
            
        </div>
    )


}