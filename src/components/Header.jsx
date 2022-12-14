import styles from './Header.module.css'
import ReaCloudLogo from '../assets/RClogo.svg'

export function Header() {
    return (
        <header className = { styles.header }>

            <div className = { styles.home }>
                <img className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo do ReaCloud"/>
                <span className = { styles.reaCloudLogoText }>ReaCloud</span>
            </div>

            <div className = { styles.buttons }>
                <button className = { styles.addReaButton } >ADICIONAR RECURSO</button>
                <span className = { styles.loginButtons } >
                    <button className = { styles.loginButton } >ENTRE</button>
                    {' '} OU {' '}
                    <button className = { styles.loginButton } >CADASTRE-SE</button>
                </span>                
            </div>

        </header>
    );
}