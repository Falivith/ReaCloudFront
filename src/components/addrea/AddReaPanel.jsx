import { ReaCloudStaticLogo } from "../ReaCloudStaticLogo";
import AddRing from "../../assets/Add_ring_green.png";
import EditGear from "../../assets/Gear.png";
import styles from "./AddReaPanel.module.css";
import { useNavigate } from 'react-router-dom';

export function AddReaPanel(){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }
    
    return(
    <div className = { styles.container }>
        <ReaCloudStaticLogo/>
        <div onClick = {() => routeChangeHandler('/pluginreas')} className = { styles.addNewReaContainer }>
            <div className = { styles.addImgContainer }>
                <img src = { AddRing } alt = "Adicionar novo recurso" />
            </div>
            <div className = { styles.textContainer }>
                <h1 className = { styles.addReaTitle }>ADICIONAR NOVOS RECURSOS</h1>
                <p>Adicione novos recursos que foram salvos pelo plugin ou crie um novo recurso!</p>                
            </div>
        </div>
        <div onClick = {() => routeChangeHandler('/editpostedreas')} className = { styles.editReaContainer }>
            <div className = { styles.editImgContainer }>
                <img src = { EditGear } alt = "Editar recurso" />
            </div>
            <div className = { styles.textContainer }>
                <h1 className = { styles.editReaTitle }>EDITAR RECURSOS</h1>
                <p className = { styles.editReaSpan }>Faça alterações em recursos adicionados anteriormente.</p>                
            </div>
        </div>
    </div>
    )
}
