import styles from './RemoveReaModal.module.css'
import XFigure from '../../assets/XFigure.png'

export function RemoveReaModal(){
    return(
        <div className = { styles.background }>
            <div className = { styles.modalContainer }>
                <header className = { styles.header }>
                    <img src = { XFigure } alt = "Figura de remoção"/>
                    <h1> Remover recurso </h1>
                </header>
                <div className = { styles.textContainer }>
                    <p className = { styles.text }>Você deseja <span className = { styles.span }> remover </span> o recurso <strong>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?</strong></p>
                </div>
                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton }> Cancelar </button>
                    <button className = { styles.submitButton }> Salvar </button>
                </div>
            </div>
        </div>
    )
}
