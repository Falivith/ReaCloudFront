import EditGear from "../../../assets/Gear.png";
import { PostedResourceContainer } from "./PostedResourceContainer";
import styles from "./EditReaPanel.module.css";
import { useNavigate } from 'react-router-dom';
import Loading from "../../Loading";

export function EditReaPanel({reas, isLoading}){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return(
        <div className = { styles.container }>
            <div className = { styles.header }>
                <div className = { styles.addNewReasLabel }>
                    <img src = { EditGear } alt = "Editar seus Recursos" />
                    <h1>Edite seus recursos</h1>                    
                </div>
                <span>Você tem <span className = { styles.pluginReaCounter }>{reas?.length}</span> recursos cadastrados. </span>
            </div>
            <div className = { styles.pluginRequester }>
                {isLoading ? <Loading editReas = {true} /> :
                (reas && reas.map(rea => {
                    return <PostedResourceContainer
                        id = {rea.id}
                        key = {rea.id}
                        title = {rea.title}
                    />
                    })
                )}
            </div>
        </div>
    )
}
