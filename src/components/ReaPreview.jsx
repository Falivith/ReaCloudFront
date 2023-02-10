import styles from './ReaPreview.module.css'

export function ReaPreview(){
    return (
        <div className = { styles.container }>
            <div className = { styles.thumbContainer }></div>
            <div className = { styles.contentContainer }>
                <div className = { styles.text }>
                    <h1 className = { styles.reaTitle } >Atividades de Matemática de acordo com a BNCC</h1>
                    <p className = { styles.reaDescription }> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi nobis illum quas nam assumenda rem dolor error ipsam adipisci voluptatum tempora placeat ea vitae veniam temporibus iusto pariatur, labore maxime. </p>
                    <span className = { styles.likesCount }>10 Pessoas acharam isso útil</span>
                    <div className = { styles.buttonContainer }>
                        <button> Útil </button>
                        <button> Comentários </button>
                    </div>
                </div>
            </div>
        </div>
    );
}