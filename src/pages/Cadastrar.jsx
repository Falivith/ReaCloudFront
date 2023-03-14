import { FormCadastro } from '../components/cadastro/FormCadastro';
import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';

export function Cadastrar() {
    
    const wrapper = {
        "marginTop": "3rem",
        "maxWidth": "100rem",
        "display": "flex",
        "justifyContent": "center",
    }
    
    
    return (
        <div>
            <Header showCadastro = {false} showAddRecurso = {false}/>   
            <div style = {wrapper}>
            <ReaCloudStaticLogo/>
            </div>
            <FormCadastro/>
        </div>
    )

}
