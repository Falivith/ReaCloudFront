import styles from "./PostedResourceContainer.module.css";
import { useNavigate } from "react-router-dom";

export function PostedResourceContainer(props){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);

    }
    return(
        <div className = { styles.container }>
            <h1>{ props.title }</h1>
            <button onClick={() => routeChangeHandler('/postedreaedit')}>EDITAR</button>
        </div>
    )
}
