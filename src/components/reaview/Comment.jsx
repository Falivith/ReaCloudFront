import { deleteComment } from "../../services/comment";
import RemoveCommentModal from "../modals/RemoveCommentModal";
import styles from "./Comment.module.css";
import { useState } from "react";

export function Comment({ id, nome, text, date, foto, fetchAgain, author }) {
  
  const handleCommentDeletion = async () => {
    const response = await deleteComment(id);
    if (response) {
      fetchAgain();
    } else {
      console.error("Erro ao deletar o comentário");
    }
  };

  const [modalOpen, open] = useState(false);

  const callModal = () => {
      open(!modalOpen);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const handleClick = async () => {
    callModal();
    await handleCommentDeletion();
  }

  const formattedDate = new Date(date).toLocaleDateString();
  const formattedTime = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.container}>
      <div className={styles.profilePhotoContainer}>
        {foto && <img className={styles.profilePhoto} src={foto} alt="Foto do perfil" />}
      </div>
      <div className={styles.commentDetails}>
        <div className={styles.textContainer}>
          <span className={styles.commentTitle}>{nome}</span>
          <p className={styles.commentContent}>{text}</p>
        </div>
        <div className={styles.commentActions}>
          {author && (
            <button onClick={callModal} className={styles.deleteButton}>
              Excluir
            </button>
          )}
          <p className={styles.commentDate}>{formattedDate} {formattedTime}</p>
        </div>
      </div>
      {modalOpen && <RemoveCommentModal  callModal={callModal} id={id} refreshPage={refreshPage} deleteFunc={handleCommentDeletion} />}
    </div>
  );
}
