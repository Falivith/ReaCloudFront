import googleLogo from '../../assets/Google.png'
import styles from './FormLogin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { LabelAndInput } from './LabelAndInput';
import { Button } from './Button';
import jwt_decode from 'jwt-decode';

import styleLabelandInput from './LabelAndInput.module.css'
import { useEffect, useState } from 'react';
import {login} from '../../services/authentication';



const styleImage = {"marginTop":"1rem",
                    "marginBottom":"0.75rem",
                    "width": "1.25rem",
                    "height": "1.25rem",
                    "marginRight": "0.4rem"
                }




                
export function FormLogin(){
    
    function handleCallBackResponse(response){
        console.log("Encoded JWT ID token" + response.credential);
        let userObject = jwt_decode(response.credential)
        console.log(userObject);

      }
    
      useEffect(() => {
        /* global google */
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: "567563462560-pgebq1hruc66b5nlhjt6qb910m7tk0b7.apps.googleusercontent.com",
                callback: handleCallBackResponse
                });
            
                google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", 
                size: "large",
                width: "364",
                shape: "square",     }  // ou pill
                );
    
                google.accounts.id.prompt()
          }
        
            
        
        }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
     
    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const user = await login({
              email,password
            })
            console.log('token', user);
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
                {/* <button id="signInDiv" className={styles.containerButtons}> <span className={styles.spanText} ><img src= {googleLogo} style = {styleImage}  /> ENTRAR COM O GOOGLE </span></button> */}
                <div id="signInDiv"></div> 
                <Button textButton={'ENTRAR'}/>
                
                <button className={styles.containerButtons}> <span className={styles.spanText} > CADASTRAR  </span></button>
            </div>
            <p className={styles.forgotPassword}>Esqueceu sua senha?&nbsp;<Link to={'../redefinir'} >Clique aqui</Link>  </p>
        </form>
    </div>  
    )
}