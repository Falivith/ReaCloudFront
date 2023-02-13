import styles from './ReaPanel.module.css'
import Like from '../../assets/Like.png'
import Comments from '../../assets/Comments.png'
import ReaThumb from '../../assets/ExampleRea.png'

export function ReaPanel(){
    return (
        <div className = { styles.container }>
            <div className = { styles.thumbAuxContainer }>
                <div className = { styles.previewContainer }>
                    <h1 className = { styles.reaTitle }>Atividades de Matemática de acordo com a BNCC</h1>
                    <span className = { styles.likesCount }>948 pessoas acharam isso útil</span>
                    <div className = { styles.buttonContainer }>
                        <button className = { styles.socialButton }> <img src = { Like } alt = "Joinha" /> Útil </button>
                        <button className = { styles.socialButton }> <img src = { Comments } alt = "Joinha" /> Comentários </button>
                        <a className = { styles.bugReport } href = "#"> Informar um Problema </a>
                    </div>
                </div>
                <img src = { ReaThumb } alt="reaThumb" />  
            </div>
           
            <ul className = { styles.metaData } >
                <li> <strong>Tipo do Material:</strong> Website </li>
                <li> <strong>Área do conhecimento:</strong> Matemática </li>
                <li> <strong>Tipo de Licensa:</strong> Creative Commons </li>
                <li> <strong>Público alvo:</strong> Ensino Fundamental</li>
                <li> <strong>Idioma:</strong> Português </li>
                <li> <strong>Descrição:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto praesentium, quis a temporibus quam molestiae eum laborum odio officia ipsa animi cum, consequuntur culpa eaque delectus! Dolore sint illum libero!</li>
                <li> <strong>Instruções de uso:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore consequatur eaque dolores quod sit alias suscipit odio ducimus libero perspiciatis quasi cum fuga eveniet, at dicta deleniti voluptatibus repellat obcaecati?</li>
            </ul>
        </div>
    );
}
