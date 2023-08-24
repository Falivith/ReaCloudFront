import styles from './CommentSection.module.css';
import { Comment } from './Comment';

export function CommentSection(){
    return(
        <div className = { styles.container }>
            <label htmlFor = "commentTextArea" className = { styles.headerLabel }>Envie um comentário</label>
            <form className = { styles.formContainer }>
                <textarea rows="4" cols="20" name="comment" id = "commentTextArea"  maxLength="1000" className = { styles.textArea }></textarea>
                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton }>Cancelar</button>
                    <button className = { styles.submitButton }>Enviar Comentário</button>
                </div>
            </form>
            <div className = { styles.commentList }>
                <Comment/>
                <Comment/>
            </div>
        </div>
    )
}
