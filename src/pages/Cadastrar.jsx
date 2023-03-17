import { FormCadastro } from '../components/cadastro/FormCadastro';
import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';
import styles from '../App.module.css';

export function Cadastrar() {
    
    return (
        <div>
            <Header />   
            <div className = { styles.loginRCLogo }>
                <ReaCloudStaticLogo/>
            </div>
            <FormCadastro/>
        </div>
    )

}
