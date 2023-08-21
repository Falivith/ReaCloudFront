import styles from './FormLogin.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { LabelAndInput } from './LabelAndInput';
import { Button } from './Button';
import styleLabelandInput from './LabelAndInput.module.css';
import { useState } from 'react';
import { login } from '../../services/authentication';
import { useGoogleLogin } from '@react-oauth/google';
import { BaseNotification } from '../modals/BaseNotification';

const styleImage = 
    {
        "marginTop":"1rem",
        "marginBottom":"0.75rem",
        "width": "1.25rem",
        "height": "1.25rem",
        "marginRight": "0.4rem"
    }

export function FormLogin(){

    const signIn = useGoogleLogin({
        onSuccess: async tokenResponse => {
          console.log(tokenResponse);
          navigate('/');
        },
      });
    
    const handleClick = (event) => {
        event.preventDefault();  // Prevent the form from being submitted
        signIn();  // Manually trigger Google login
      };

    const navigate = useNavigate();

    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    const closeNotification = () => {
        setShowNotification(false);
    };
    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        console.log("ta entrando");
        try {
            const user = await login({
              email,password
            })  
            console.log('user = ', user);
            navigate('/');
        }
        catch (exception) {
            setNotificationType("loginError")
            setShowNotification(true)
        }
    }

    return(
    <div className= {styles.container}>

        {(<BaseNotification type = {notificationType} showing={showNotification} onClose={closeNotification}  />)}

        <form onSubmit={handleSubmit} > 
 
            <LabelAndInput value ={email} onChange = {({target})=> setEmail(target.value)} labelText={'E-MAIL'} inputType={"email"} placeholderText={'exemplo@email.com'} inputStyle = {styleLabelandInput.input}/>
            
            <LabelAndInput value ={password} onChange = {({target})=> setPassword(target.value)} labelText={'SENHA'} inputType={"password"}  placeholderText={'• • • • • • •'} inputStyle = {styleLabelandInput.input}/>
            <div className={styles.containerForButtons}>
              
                <button onClick={handleClick}  id="signInDiv" className={styles.containerButtons}> 
                    <div className = {styles.googleImgContainer}>
                        <img src= {'Google.png'} style = {styleImage}/>                            
                    </div>
                    <span className={styles.spanText}> ENTRAR COM O GOOGLE </span>
                </button>
              
                <Button textButton={'ENTRAR'}/>
                
                <button onClick={() => routeChangeHandler('cadastro')} className={styles.containerButtons}> <span className={styles.spanText} > CADASTRAR  </span></button>
            </div>
            <p className={styles.forgotPassword}>Esqueceu sua senha?&nbsp;<Link to={'../redefinir'} >Clique aqui</Link>  </p>
        </form>
    </div>  
    )
}
