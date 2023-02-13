import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';
import { FormLogin } from '../components/FormLogin';

const wrapper = {"marginTop":"4.875rem","maxWidth":"100rem","display":"flex","justifyContent":"center"}




export function Login() {
    return (
    <div>
        
        <Header showLogin = {false}/>    
        {/* ler sobre form e react */}
        <div style = {wrapper}>
        <ReaCloudStaticLogo/>
        <FormLogin/>
        
        </div>
    </div>    )
}