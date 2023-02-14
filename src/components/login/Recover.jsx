import styles from './Recover.module.css'
import { Header } from '../Header';
import { LabelAndInput } from './LabelAndInput';
import { Button } from './Button';
import styled from 'styled-components';

const PrimaryButton = styled(Button)`
color: pink;
background-color: green;
`;

export function Recover() {

    return(
        
        <div> <Header showAddRecurso = {false}/> 
            <div className={styles.container}>
                <p className={styles.titleText}>Redefinição de senha</p>
                <br></br>
                <p className={styles.normalText}>Informe o e-mail utilizado na criação da sua conta e enviaremos instruções para redefinir a sua senha!</p>
                <form>
                    <LabelAndInput labelText={'E-MAIL'} inputType={"email"} placeholderText={'exemplo@email.com'}/>
                    <div className={styles.marginDiv}>
                    <PrimaryButton textButton={'ENVIAR'} class2={styles.spanText2} />
                    </div>
                </form>
            </div>
            
        </div>
    )


}