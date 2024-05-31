import styles from './ReaPreview.module.css';
import Like from '../../assets/Like.png';
import Comments from '../../assets/Comments.png';
import { useNavigate } from 'react-router-dom';

export function ReaPreview(props){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}/${props.id}`);
    }

    const getLikesText = (likes) => {
        if (likes == 0) {
            return "Ainda não avaliaram esse recurso.";
        } else if (likes == 1) {
            return "1 pessoa achou isso útil.";
        } else {
            return `${likes} pessoas acharam isso útil.`;
        }
    }

    const handleButtonClick = (event, action) => {
        event.stopPropagation();
        if (action === 'like') {
            // Lógica para o botão "Útil"
            console.log("Botão 'Útil' clicado");
        } else if (action === 'comments') {
            // Lógica para o botão "Comentários"
            console.log("Botão 'Comentários' clicado");
        }
    }

    return (
        <div className = { styles.container } onClick={() => routeChangeHandler('/ReaView')}>
            <div className = { styles.thumbContainer }>
                <img onClick={() => routeChangeHandler('/ReaView')} className = { styles.dynamicImg } src = { props.thumb } alt = "thumbPreview" />
            </div>
            <div className = { styles.contentContainer }>
                <div className = { styles.text }>
                    <h1 onClick={() => routeChangeHandler('/ReaView')} className = { styles.reaTitle } > { props.title } </h1>
                    <p className = { styles.reaDescription }> { props.description } </p>
                    <span className = { styles.likesCount }>{ getLikesText(props.likes) }</span>
                    <div className = { styles.buttonContainer }>
                        <button className = { styles.socialButton } onClick={(event) => handleButtonClick(event, 'like')}> 
                            <img src = { Like } alt = "Joinha" /> Útil 
                        </button>
                        <button className = { styles.socialButton } onClick={(event) => handleButtonClick(event, 'comments')}> 
                            <img src = { Comments } alt = "Comentários" /> Comentários 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
