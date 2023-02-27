import styles from './Header.module.css';
import ReaCloudLogo from '../assets/RClogo.svg';
import RecursosEducacionaisLogo from '../assets/Add_ring.png';
import UserLogo from '../assets/User_circle_light.png';
import { useNavigate } from 'react-router-dom';

export function Header({ showLogin = true, showCadastro = true, showAddRecurso = true, isLogged = false, notificationNumber = 0 }) {
    const navigate = useNavigate();
    
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return (
        <header className={ styles.header }>
            <div className={ styles.home }>
                <img onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo da ReaCloud" />
                <span onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogoText }>ReaCloud</span>
            </div>
            <div className = { styles.buttons }>
                {showAddRecurso ?
                    <button onClick = {() => routeChangeHandler('add')} className={ styles.addReaButton } >ADICIONAR RECURSO</button>
                    : null
                }
                {!isLogged ?
                    <span className = { styles.loginButtons } >
                        {showLogin ?
                            <button className={ styles.loginButton } onClick={() => routeChangeHandler('login')}>ENTRE</button>
                            : null}
                        {showLogin && showCadastro ? ' OU ' : ''}
                        {showCadastro ?
                            <button onClick={() => routeChangeHandler('cadastro')} className = { styles.loginButton } >CADASTRE-SE</button>
                            : null}
                    </span>
                : null
                }
                {isLogged ?
                <div className = { styles.buttons }>
                    <img onClick = {() => routeChangeHandler('')} className = { styles.reaCloudLogo } src = { RecursosEducacionaisLogo } />
                    {notificationNumber > 0 ?
                        <span className = {`badge ${styles.badge}`}>{notificationNumber}</span>
                    :null}
                    <button className = { styles.buttonsLogged } onClick = {() => routeChangeHandler('')}>RECURSOS EDUCACIONAIS</button>
                    <img onClick = {() => routeChangeHandler('')} className = { styles.reaCloudLogo } src = { UserLogo } />
                    <button className = { styles.buttonsLogged } onClick={() => routeChangeHandler('/profile')}>MEU PERFIL</button>
                </div>
                : null
                }
            </div>
        </header>
    );
}
