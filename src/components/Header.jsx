import styles from './Header.module.css'
import ReaCloudLogo from '../assets/RClogo.svg'
import { useNavigate } from 'react-router-dom';

export function Header({showLogin = true, showCadastro = true, showAddRecurso = true}) {
    const navigate = useNavigate();   
    
    const routeChangeHandler = (route) => {
        navigate(`../${route}`, { replace: true });
    } 


    return (
        <header className = { styles.header }>

            <div className = { styles.home }>
                <img onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo da ReaCloud"/>
                <span onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogoText }>ReaCloud</span>
            </div>

            <div className = { styles.buttons }>
               {showAddRecurso ? 
                <button onClick = {() => routeChangeHandler('add')} className = { styles.addReaButton } >ADICIONAR RECURSO</button>
               : null
                }
                <span className = { styles.loginButtons } >
                    {showLogin ?
                    <button  className = { styles.loginButton } onClick = {() => routeChangeHandler('login')}>ENTRE</button> 
                    : null }
                    {showLogin && showCadastro ? ' OU ': ''} 
                    {showCadastro ?
                     <button onClick = {() => routeChangeHandler('cadastro')}  className = { styles.loginButton } >CADASTRE-SE</button>
                     :null}
                </span>                
            </div>

        </header>
    );
}