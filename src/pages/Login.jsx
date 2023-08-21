import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';
import { FormLogin } from '../components/login/FormLogin';
import styles from '../App.module.css';

const wrapper = {"marginTop":"3rem",
                  "margin" :"3rem, auto",
                  "maxWidth":"100rem",
                  "display":"flex",
                  "justifyContent":"center",
                }

export function Login() {
    return (
        <div>
            <Header />    
            <div className = { styles.loginRCLogo }>
                <ReaCloudStaticLogo/>
            </div>
            <FormLogin/>
        </div>
    )
}
