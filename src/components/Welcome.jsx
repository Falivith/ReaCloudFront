import styles from './Welcome.module.css'
import { ReaCloudStaticLogo } from './ReaCloudStaticLogo'
import Art from '../assets/RCart.svg'

export function Welcome (){
    return(
        <div className = { styles.container }>
            <ReaCloudStaticLogo/>
            <span className = { styles.content }>O <strong>ReaCloud</strong>  te ajuda a encontrar e catalogar Recursos Educacionais Abertos REAs.
Utilize a busca para encontrar um REA ou vá até seu perfil para gerenciar recursos!
            </span>
        </div>
    );
}