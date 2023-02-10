import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';

import styles from '../components/Welcome.module.css';



export function Login() {
    return (
        <div>
            <Header showLogin = {false}/>    
        
            <div className = { styles.container }>
            <ReaCloudStaticLogo/>
        </div>
        </div>    )

}