import styles from './RemoveReaModal.module.css'
import XFigure from '../../assets/XFigure.svg'
import { deleteRea } from '../../services/submitNewRea';

export default function RemoveReaModal(props){

    async function handleDelete() {
        let deleted = await deleteRea(props.id);
        if(deleted.status === 204){
            props.callModal();
            props.refreshPage();
        }
    }

    return(
        <div className = { styles.background }>
            <div className = { styles.modalContainer }>
                <header className = { styles.header }>
                    <img src = { XFigure } alt = "Figura de remoção"/>
                    <h1> Remover recurso </h1>
                </header>
                <div className = { styles.textContainer }>
                    <p className = { styles.text }>Você deseja <span className = { styles.span }> remover </span> o recurso <strong>{ props.title }</strong>?</p>
                </div>
                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton } onClick = {props.callModal} >CANCELAR</button>
                    <button onClick={() => { handleDelete(); props.callModal(); }} className={styles.submitButton}>REMOVER</button>
                </div>
            </div>
        </div>
    )
}
