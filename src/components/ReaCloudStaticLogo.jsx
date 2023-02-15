import styles from './ReaCloudStaticLogo.module.css';
import ReaCloudLogo from '../assets/RClogoBlue.svg';

export function ReaCloudStaticLogo() {
    return (
        <div className = { styles.body } >
            <img className = { styles.reaCloudLogo } src={ ReaCloudLogo } alt="Logotipo da ReaCloud"/>
            <span className = { styles.reaCloudLogoText }>ReaCloud</span>
        </div>
    );
}
