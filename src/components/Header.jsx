import styles from './Header.module.css'
import ReaCloudLogo from '../assets/RClogo.svg'
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

export function Header() {
    const navigate = useNavigate();   
    
    const routeChangeHandler = (route) => {
        navigate('login');
    } 


    return (
        <header className = { styles.header }>

            <div className = { styles.home }>
                <img className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo da ReaCloud"/>
                <span className = { styles.reaCloudLogoText }>ReaCloud</span>
            </div>

            <div className = { styles.buttons }>
                <button className = { styles.addReaButton } >ADICIONAR RECURSO</button>
                <span className = { styles.loginButtons } >
                    <button className = { styles.loginButton } onClick = {routeChangeHandler}>ENTRE</button>
                    {' '} OU {' '}
                    <button className = { styles.loginButton } >CADASTRE-SE</button>
                </span>                
            </div>

        </header>
    );
}