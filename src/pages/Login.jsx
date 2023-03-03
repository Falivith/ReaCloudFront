import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';
import { FormLogin } from '../components/login/FormLogin';


const wrapper = {"marginTop":"3rem",
                  "maxWidth":"100rem",
                  "display":"flex",
                  "justifyContent":"center",
                }


export function Login() {
    return (
    <div>
        
        <Header showLogin = {false}/>    
        <div style = {wrapper}>
        <ReaCloudStaticLogo/>
        </div>
        <FormLogin/>
        
    </div>    )
}