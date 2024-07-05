import { useState, useEffect } from "react";
import styles from "./CommentSection.module.css";
import { Comment } from "./Comment";
import { submitComment, getCommentInfo } from "../../services/comment"; // Updated import
import { Pagination } from "../explorer/Pagination";
import { getUserInfoFromJWT } from "../../services/authentication";
import { BaseNotification } from "../modals/BaseNotification";

export function CommentSection({ resourceId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // New state for total pages

  const commentsPerPage = 5;

  useEffect(() => {
    fetchComments();
  }, [resourceId, currentPage]); // Update comments when resourceId or currentPage changes

  const fetchComments = async () => {
    try {
      const userInfo = await getUserInfoFromJWT();
      setLoading(true);
      const commentInfo = await getCommentInfo(resourceId, currentPage, commentsPerPage);

      if (userInfo) {
        setUserLoggedIn(true);
      }

      if (userInfo && commentInfo.comments) {
        commentInfo.comments.forEach((comment) => {
          if (comment.user_id === userInfo.id) {
            comment.User.given_name = "Você";
            comment.User.isAuthor = true;
          }
        });
      }

      setComments(commentInfo.comments);
      setTotalPages(commentInfo.totalPages); // Update total pages
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
    let res = await submitComment(commentText, resourceId);
    
    if (res.error) {
      switch (res.message) {
        case 'Unlogged':
          setNotificationType('saveCommentUnlogged');
          break;
        case 'Bad Request':
          setNotificationType('saveCommentBadRequest');
          break;
        case 'Network Error':
          setNotificationType('saveReaErrorNetwork');
          break;
        default:
          setNotificationType('saveCommentBadRequest');
      }
      setShowNotification(true);
    } else {
      fetchComments();
      setCommentText("");
    }
  };

  const handleCancelComment = (event) => {
    event.preventDefault();
    setCommentText("");
  };

  return (
    <div className={styles.container}>
      <BaseNotification
        type={notificationType}
        showing={showNotification}
        onClose={() => setShowNotification(false)}
      />
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
          disabled={!userLoggedIn}
          placeholder={!userLoggedIn ? "Faça Login para poder comentar" : ""}
        ></textarea>
        <div className={styles.buttonsContainer}>
          <button
            className={!userLoggedIn ? styles.disabledButton : styles.cancelButton}
            onClick={handleCancelComment}
            disabled={!userLoggedIn}
          >
            Cancelar
          </button>
          <button
            className={!userLoggedIn ? styles.disabledButton : styles.submitButton}
            onClick={handleSubmitComment}
            disabled={!userLoggedIn}
          >
            Enviar Comentário
          </button>
        </div>
      </form>

      <div className={styles.commentList}>
        {loading ? (
          <p>Loading...</p>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                nome={comment.User.given_name}
                text={comment.comment}
                date={comment.created_at}
                foto={comment.User.profilePicture}
                author={comment.User.isAuthor}
                fetchAgain={fetchComments}
              />
            );
          })
        ) : (
          <p>Nenhum comentário encontrado.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
