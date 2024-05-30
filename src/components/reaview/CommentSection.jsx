import { useState, useEffect } from "react";
import styles from "./CommentSection.module.css";
import { Comment } from "./Comment";
import { submitComment, getCommentInfo } from "../../services/comment";
import { Pagination } from "../explorer/Pagination"
import { getUserInfoFromJWT } from "../../services/authentication";

export function CommentSection({ resourceId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const commentsPerPage = 5;

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  const fetchComments = async () => {
    try {
      const userInfo = await getUserInfoFromJWT();
      setLoading(true);
      const commentInfo = await getCommentInfo(resourceId);

      if(userInfo){
        commentInfo.forEach(comment => {
          if (comment.user_id === userInfo.id) {
            console.log(comment);
            comment.user.given_name = "Você";
            comment.user.isAuthor = true;
          }
        });
      }

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

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

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
        ) : currentComments && currentComments.length > 0 ? (
          currentComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                nome={comment.user.given_name}
                text={comment.comment}
                date={comment.createdAt}
                foto={comment.user.profilePicture}
                author={comment.user.isAuthor}
                fetchAgain={fetchComments}
              />
            );
          })
        ) : (
          <p>Nenhum comentário encontrado.</p>
        )}
      </div>

      {comments.length > commentsPerPage && (
        <Pagination 
          setCurrentPage={setCurrentPage} 
          currentPage={currentPage} 
        />
      )}
    </div>
  );
}
