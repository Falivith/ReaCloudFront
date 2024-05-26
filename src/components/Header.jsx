import styles from './Header.module.css';
import ReaCloudLogo from '../assets/RClogo.svg';
import RecursosEducacionaisLogo from '../assets/Add_ring.png';
import SairLogo from '../assets/Close_round_light.png'
import UserLogo from '../assets/User_circle_light.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google";

export function Header() {

    var ExtensionId = "hhglkeeogekcimonpepemfjabkikbimh"

    const [reasPluginCount, setReasPluginCount] = useState(0);

    const signIn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            setIsLoggedIn(true);
            localStorage.setItem('reaCloudSession', JSON.stringify({ tokenResponse }));
            navigate("/");
        },
    });

    const handleClick = (event) => {
        event.preventDefault();
        signIn();
    };

    useEffect(() => {
        const extensionId = ExtensionId;
        if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage(extensionId, { getTargetData: true }, (response) => {
                if (response && response.setTargetData) {
                    setReasPluginCount(response.setTargetData.length)
                }
            });
        }
    }, []);

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    const logout = () => {
        window.localStorage.clear()
        setIsLoggedIn(false)
        navigate('../')
        window.location.reload();
    }

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('reaCloudSession');
        setIsLoggedIn(user);
        setInitialCheckDone(true);
    }, []);

    if (!initialCheckDone) {
        return null;
    }

    return (
        <header className={styles.header}>
            <div className={styles.home}>
                <img onClick={() => routeChangeHandler('/')} className={styles.reaCloudHat} src={ReaCloudLogo} alt="Logotipo da ReaCloud" />
                <span onClick={() => routeChangeHandler('/')} className={styles.reaCloudLogoText}>ReaCloud</span>
            </div>
            <div className={styles.buttons}>
                {isLoggedIn ?
                    <div className={styles.buttons}>
                        <img onClick={() => routeChangeHandler('addrea')} className={styles.reaCloudLogo} src={RecursosEducacionaisLogo} />
                        {reasPluginCount > 0 ?
                            <span className={`badge ${styles.badge}`}>{reasPluginCount}</span>
                            : null}
                        <button className={styles.buttonsLogged} onClick={() => routeChangeHandler('addrea')}>RECURSOS</button>
                        <img onClick={() => routeChangeHandler('profile')} className={styles.reaCloudLogo} src={UserLogo} />
                        <button className={styles.buttonsLogged} onClick={() => routeChangeHandler('profile')}>MEU PERFIL</button>
                        <img onClick={logout} className={styles.sairLogo} src={SairLogo} />
                        <button className={styles.buttonsLogged} onClick={logout}>SAIR</button>
                    </div>
                    : <span className={styles.loginButtons} >
                        <button onClick={() => routeChangeHandler('addrea')} className={styles.addReaButton} >ADICIONAR RECURSO</button>
                        <div className={styles.loginAndSignup}>
                            <button className={styles.loginButton} onClick={(event) => handleClick(event)}>ENTRE</button>
                            {' OU '}
                            <button onClick={(event) => handleClick(event)} className={styles.loginButton} >CADASTRE-SE</button>
                        </div>
                    </span>
                }
            </div>
        </header>
    );
}
