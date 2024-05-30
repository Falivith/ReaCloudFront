import styles from './RemoveCommentModal.module.css'
import XFigure from '../../assets/XFigure.svg'
import { deleteRea } from '../../services/submitNewRea';

export default function RemoveCommentModal(props){
    return(
        <div className = { styles.background }>
            <div className = { styles.modalContainer }>
                <header className = { styles.header }>
                    <img onClick = {props.callModal} src = { XFigure } alt = "Figura de remoção"/>
                    <h1> Remover comentário </h1>
                </header>
                <div className = { styles.textContainer }>
                    <p className = { styles.text }>Você deseja mesmo <span className = { styles.span }> remover </span> o seu comentário? </p>
                </div>
                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton } onClick = {props.callModal} >CANCELAR</button>
                    <button onClick={() => { props.deleteFunc(); props.callModal(); }} className={styles.submitButton}>REMOVER</button>
                </div>
            </div>
        </div>
    )
}
