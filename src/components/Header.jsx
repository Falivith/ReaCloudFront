import styles from './Header.module.css';
import ReaCloudLogo from '../assets/RClogo.svg';
import RecursosEducacionaisLogo from '../assets/Add_ring.png';
import SairLogo from '../assets/Close_round_light.png'
import UserLogo from '../assets/User_circle_light.png';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../services/authentication';
import { useEffect, useState } from 'react';


export function Header({notificationNumber = 0 }) {
    
    
    
    
    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    const logout = () => {
        window.localStorage.clear()
        setIsLoggedIn(false)
        window.location.reload();
    }



    const [isLoggedIn, setIsLoggedIn] = useState(null); 

    useEffect(() => {
        async function fetchLoginStatus() {
          const isLoggedIn = await checkLogin();
          setIsLoggedIn(isLoggedIn);
        }
      
        fetchLoginStatus();
      }, []);
    

    return (
        
        
        <header className={ styles.header }>
            <div className={ styles.home }>
                <img onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo da ReaCloud" />
                <span onClick = {() => routeChangeHandler('/')} className = { styles.reaCloudLogoText }>ReaCloud</span>
            </div>
            <div className = { styles.buttons }>
                {!isLoggedIn ?
                    <button onClick = {() => routeChangeHandler('addrea')} className={ styles.addReaButton } >ADICIONAR RECURSO</button>
                    : null
                }
                {!isLoggedIn ?
                    <span className = { styles.loginButtons } >
                        {!isLoggedIn ?
                            <button className={ styles.loginButton } onClick={() => routeChangeHandler('login')}>ENTRE</button>
                            : null}
                        {!isLoggedIn ? ' OU ' : ''}
                        {!isLoggedIn ?
                            <button onClick={() => routeChangeHandler('cadastro')} className = { styles.loginButton } >CADASTRE-SE</button>
                            : null}
                    </span>
                : null
                }
                {isLoggedIn ?
                <div className = { styles.buttons }>
                    <img onClick = {() => routeChangeHandler('')} className = { styles.reaCloudLogo } src = { RecursosEducacionaisLogo } />
                    {notificationNumber > 0 ?
                        <span className = {`badge ${styles.badge}`}>{notificationNumber}</span>
                    :null}
                    <button className = { styles.buttonsLogged } onClick = {() => routeChangeHandler('addrea')}>RECURSOS EDUCACIONAIS</button>
                    <img onClick = {() => routeChangeHandler('')} className = { styles.reaCloudLogo } src = { UserLogo } />
                    <button className = { styles.buttonsLogged } onClick={() => routeChangeHandler('profile')}>MEU PERFIL</button>
                    <img onClick = {logout} className = { styles.sairLogo} src = { SairLogo } />
                    <button className={ styles.buttonsLogged } onClick={logout}>SAIR</button>
                </div>
                : null
                }
            </div>
        </header>
    );
}
