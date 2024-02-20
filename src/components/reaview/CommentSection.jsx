import { useState, useEffect } from 'react';
import styles from './CommentSection.module.css';
import { Comment } from './Comment';
import avatar1 from './Avatar.webp';
import avatar2 from './Avatar2.png';
import { submitComment } from '../../services/comment';
import { getCommentInfo } from '../../services/comment';

const mocados = [
    {
        nome: "Fulano",
        text:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada enim ut orci pretium, in iaculis massa porttitor. Ut rutrum arcu vitae fermentum elementum. Fusce tristique, lacus at fermentum lacinia, libero quam egestas est, non semper justo diam ac dui. Nullam ac tempor sem. In rutrum ac massa sed viverra. Quisque elementum mauris vitae sollicitudin fringilla.",
        date: "2021-08-04T12:00:00Z",
        foto: avatar1
    },
    {
        nome: "Fulano",
        text:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada enim ut orci pretium, in iaculis massa porttitor. Ut rutrum arcu vitae fermentum elementum. Fusce tristique, lacus at fermentum lacinia, libero quam egestas est, non semper justo diam ac dui. Nullam ac tempor sem. In rutrum ac massa sed viverra. Quisque elementum mauris vitae sollicitudin fringilla.",
        date: "2021-08-04T12:00:00Z",
        foto: avatar2
    },
]

export function CommentSection({ resourceId }) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      // Fetch comments when the component mounts or when resourceId changes
      fetchComments();
    }, [resourceId]);
  
    const fetchComments = async () => {
      try {
        const commentInfo = await getCommentInfo(resourceId);
        setComments(commentInfo);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    const handleCommentChange = (event) => {
      setCommentText(event.target.value);
    };
  
    const handleSubmitComment = async (event) => {
      event.preventDefault();
  
      await submitComment(commentText, resourceId);
      console.log('Comentário enviado:', commentText);
  
      // Fetch comments after submitting a new comment
      fetchComments();
  
      setCommentText('');
    };

    return(
        <div className = { styles.container }>
            <label htmlFor = "commentTextArea" className = { styles.headerLabel }>Envie um comentário</label>

            <form className={styles.formContainer}>
                <textarea
                    rows="4"
                    cols="20"
                    name="comment"
                    id="commentTextArea"
                    maxLength="1000"
                    className={styles.textArea}
                    value={commentText}
                    onChange={handleCommentChange}
                ></textarea>
                <div className={styles.buttonsContainer}>
                    <button className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.submitButton} onClick={handleSubmitComment}>Enviar Comentário</button>
                </div>
            </form>

            <div className = { styles.commentList }>
                {comments.map( (comment, index) => (
                    <Comment key={index} nome={comment.user_id} text={comment.comment} date={comment.createdAt} foto={comment.foto} />
                ))}
            </div>

        </div>
    )
}
