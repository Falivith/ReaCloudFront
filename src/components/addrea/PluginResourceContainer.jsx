import styles from "./PluginResourceContainer.module.css";
import { useNavigate } from "react-router-dom";

export function PluginResourceContainer(props){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);

    }
    return(
        <div className = { styles.container }>
            <h1>{ props.title }</h1>
            <button onClick={() => routeChangeHandler('/reaeditadd')}>ADICIONAR</button>
        </div>
    )
}
