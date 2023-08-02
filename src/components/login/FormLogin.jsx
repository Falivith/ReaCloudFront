import styles from './FormLogin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { LabelAndInput } from './LabelAndInput';
import { Button } from './Button';
import styleLabelandInput from './LabelAndInput.module.css'
import { useEffect, useState } from 'react';
import { login } from '../../services/authentication';
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../services/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const styleImage = 
    {
        "marginTop":"1rem",
        "marginBottom":"0.75rem",
        "width": "1.25rem",
        "height": "1.25rem",
        "marginRight": "0.4rem"
    }




                
export function FormLogin(){
    
  

    


    

    const login = useGoogleLogin({
      onSuccess: tokenResponse => console.log(tokenResponse),
    });   


    const navigate = useNavigate();
    
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
     
    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const user = await login({
              email,password
            })  
            console.log('user = ', user);
            navigate('/');
        }
        catch (exception) {
            console.log("erro");
        }
    }

    return(
    <div className= {styles.container}>
        <form onSubmit={handleSubmit} > 
 
            <LabelAndInput value ={email} onChange = {({target})=> setEmail(target.value)} labelText={'E-MAIL'} inputType={"email"} placeholderText={'exemplo@email.com'} inputStyle = {styleLabelandInput.input}/>
            
            <LabelAndInput value ={password} onChange = {({target})=> setPassword(target.value)} labelText={'SENHA'} inputType={"password"}  placeholderText={'• • • • • • •'} inputStyle = {styleLabelandInput.input}/>
            <div className={styles.containerForButtons}>
              
                
                
                <button onClick={() => login()}  id="signInDiv" className={styles.containerButtons}> <span className={styles.spanText} ><img src= {googleLogo} style = {styleImage}  /> ENTRAR COM O GOOGLE </span></button>
              
              
                <Button textButton={'ENTRAR'}/>
                
                <button className={styles.containerButtons}> <span className={styles.spanText} > CADASTRAR  </span></button>
            </div>
            <p className={styles.forgotPassword}>Esqueceu sua senha?&nbsp;<Link to={'../redefinir'} >Clique aqui</Link>  </p>
        </form>
    </div>  
    )
}