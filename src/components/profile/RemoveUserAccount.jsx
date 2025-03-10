import styles from "../modals/RemoveReaModal.module.css";
import XFigure from "../../assets/XFigure.svg";
import { deleteUser } from "../../services/authentication";
import { BaseNotification } from '../modals/BaseNotification';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function RemoveUserAccount({ callModal }) {
    const navigate = useNavigate();

    async function handleDelete() {
      try {
          const response = await deleteUser();
          if (response) {
              try {
                  localStorage.clear();
                  navigate("/");
              } catch (error) {
                  console.error('Error during cleanup:', error);
                  setNotificationType('deleteUserError');
                  setShowNotification(true);
              }
          } else {
              setNotificationType('deleteUserError');
              setShowNotification(true);
              console.error(`Erro ao deletar conta. Status: ${response.status}`);
          }
      } catch (error) {
          console.error('Error in deleteUser:', error);
          setNotificationType('deleteUserError');
          setShowNotification(true);
      }
  }

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className={styles.background}>
      
        <BaseNotification
          type={notificationType}
          showing={showNotification}
          onClose={closeNotification}
        />
      
      <div className={styles.modalContainer}>
        <header className={styles.header}>
          <img src={XFigure} alt="Figura de remoção" />
          <h1> Remover Conta? </h1>
        </header>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Você deseja <span className={styles.span}> remover </span> a sua
            conta?
          </p>
          <p className={styles.text}>
            Essa ação vai remover todos os seus dados do site, incluindo
            recursos e comentários.
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={callModal}>
            CANCELAR
          </button>
          <button onClick={handleDelete} className={styles.submitButton}>
            REMOVER
          </button>
        </div>
      </div>
    </div>
  );
}
