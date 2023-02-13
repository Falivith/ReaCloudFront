import styles from './ReaPreview.module.css'
import Like from '../assets/Like.png'
import Comments from '../assets/Comments.png'

/* Atributos Dinâmicos
    title = {rea.title}
    description = {rea.description}
    likes = {rea.likes}
    thumb = {rea.thumb_url}
*/

export function ReaPreview(props){
    return (
        <div className = { styles.container }>
            <div className = { styles.thumbContainer }>
                <img src = { props.thumb } alt = "thumbPreview" />
            </div>
            <div className = { styles.contentContainer }>
                <div className = { styles.text }>
                    <h1 className = { styles.reaTitle } > { props.title } </h1>
                    <p className = { styles.reaDescription }> { props.description } </p>
                    <span className = { styles.likesCount }>{ props.likes } Pessoas acharam isso útil</span>
                    <div className = { styles.buttonContainer }>
                        <button className = { styles.socialButton }> <img src = { Like } alt = "Joinha" /> Útil </button>
                        <button className = { styles.socialButton }> <img src = { Comments } alt = "Joinha" /> Comentários </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
