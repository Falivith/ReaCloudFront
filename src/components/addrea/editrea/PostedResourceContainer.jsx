import styles from "./PostedResourceContainer.module.css";
import { useNavigate } from "react-router-dom";
import CloseSymbol from '../../../assets/CloseX.png'

export function PostedResourceContainer(props){

    let id = props.id

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return(
        <div className = { styles.container } id = { id }>
            <div className = { styles.h1container }>
                <h1>{ props.title }</h1>
            </div>
            <div>
                <button onClick={() => routeChangeHandler('/postedreaedit')}>EDITAR</button>
                <img src = { CloseSymbol } onClick = "" alt = "Figura de remoção" className = { styles.close }/>
            </div>
        </div>
    )
}
