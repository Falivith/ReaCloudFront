import styles from './Help.module.css';
import HelpImg from '../assets/Help.svg';
import { useNavigate } from "react-router-dom";

export function Help(){
    const navigate = useNavigate();


    return (
        <div className = { styles.help } >
            <img src = { HelpImg } alt="Ajuda" 
            onClick = {() => navigate('/help')}
            title="Central de Ajuda" />
        </div>
    )
}
