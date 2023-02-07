import styles from './Header.module.css'
import ReaCloudLogo from '../assets/RClogo.svg'
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();   
    
    const routeChangeHandler = (route) => {
        navigate(route);
    } 


    return (
        <header className = { styles.header }>

            <div className = { styles.home }>
                <img onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo da ReaCloud"/>
                <span onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogoText }>ReaCloud</span>
            </div>

            <div className = { styles.buttons }>
                <button onClick = {() => routeChangeHandler('AddRecurso')} className = { styles.addReaButton } >ADICIONAR RECURSO</button>
                <span className = { styles.loginButtons } >
                    <button  className = { styles.loginButton } onClick = {() => routeChangeHandler('login')}>ENTRE</button>
                    {' '} OU {' '}
                    <button onClick = {() => routeChangeHandler('Cadastrar')}  className = { styles.loginButton } >CADASTRE-SE</button>
                </span>                
            </div>

        </header>
    );
}