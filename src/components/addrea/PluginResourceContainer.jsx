import styles from "./PluginResourceContainer.module.css";
import { useNavigate } from "react-router-dom";

export function PluginResourceContainer(props){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.h1container}>
                <h1>{props.rea.title}</h1>    
            </div>
            <button onClick={() => routeChangeHandler(`/reaeditadd/${props.index}`)}>ADICIONAR</button>
        </div>
    )
}
