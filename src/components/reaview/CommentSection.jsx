import { useState, useEffect } from "react";
import styles from "./CommentSection.module.css";
import { Comment } from "./Comment";
import { submitComment, getCommentInfo } from "../../services/comment";

export function CommentSection({ resourceId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const commentInfo = await getCommentInfo(resourceId);
      setComments(commentInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await submitComment(commentText, resourceId);
    fetchComments();
    setCommentText("");
  };

  const handleCancelComment = (event) => {
    event.preventDefault();
    setCommentText("");
  };

  return (
    <div className={styles.container}>
      <label htmlFor="commentTextArea" className={styles.headerLabel}>
        Envie um comentário
      </label>

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
          <button className={styles.cancelButton} onClick={handleCancelComment}>
            Cancelar
          </button>
          <button className={styles.submitButton} onClick={handleSubmitComment}>
            Enviar Comentário
          </button>
        </div>
      </form>

      <div className={styles.commentList}>
        {loading ? (
          <p>Loading...</p>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => {
            let userImageURL = "";
            if (comment.user.profilePicture) {
              const uint8Array = new Uint8Array(comment.user.profilePicture);
              const blob = new Blob([uint8Array], { type: "Buffer" });
              userImageURL = URL.createObjectURL(blob);
            }

            return (
              <Comment
                key={comment.id}
                id={comment.id}
                nome={comment.user.given_name}
                text={comment.comment}
                date={comment.createdAt}
                foto={userImageURL}
                fetchAgain={fetchComments}
              />
            );
          })
        ) : (
          <p>Nenhum comentário encontrado.</p>
        )}
      </div>
    </div>
  );
}
