import styles from "./ReaPanel.module.css";
import Like from "../../assets/Like.png";
import Comments from "../../assets/Comments.png";
import { liked, toggleLike, getLikeCount } from "../../services/reaquerys";
import { useEffect, useState } from "react";
import { BaseNotification } from "../modals/BaseNotification";
import { backURL } from "../../services/utils";
import InformarProblemaModal from "../modals/InformarProblemaModal";
import { tipoRecurso, publicoAlvo, areasConhecimento, tiposLicenca, idiomas, formats } from "../../models/resource";

export function ReaPanel({ rea, scrollToComments }) {
  let url = `${backURL}/${rea.thumb}`;

  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    checkLike(rea.id);
  }, []);

  const checkLike = async () => {
    let response = await liked(rea.id);
    let likesCount = await getLikeCount(rea.id);
    setLikeCount(likesCount);
    setLiked(response);
  };

  const getLikesText = (likes) => {
    if (likes == 0) {
      return "Ainda não avaliaram esse recurso.";
    } else if (likes == 1) {
      return "1 pessoa achou isso útil.";
    } else {
      return `${likes} pessoas acharam isso útil.`;
    }
  };

  const handleLike = async () => {
    let response = await toggleLike(rea.id);

    if (response.success == false) {
      switch (response.message) {
        case "Nenhum usuário logado.":
          setNotificationType("likeNotLogged");
          setShowNotification(true);
          break;
        case "Erro ao adicionar/remover like:":
          setNotificationType("likeGeneralError");
          setShowNotification(true);
          break;
        default:
          return;
      }
      return;
    }

    setLiked(response);
    await checkLike();
  };

  const handleProblemReport = (success) => {
    if (success) {
      setNotificationType("reaIssueSuccess");
      setShowNotification(true);
    } else {
      setNotificationType("reaIssueError");
      setShowNotification(true);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const callModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleProblemClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setNotificationType("reaIssueErrorLogin");
      setShowNotification(true);
      return;
    } else {
    callModal();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <BaseNotification
        type={notificationType}
        showing={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <div className={styles.thumbAuxContainer}>
        <div className={styles.previewContainer}>
          <h1 className={styles.reaTitle}>
            <a href={rea.link} target="_blank" rel="noopener noreferrer">
              {rea.title}
            </a>
          </h1>
          <span className={styles.likesCount}> {getLikesText(likeCount)} </span>
          <div className={styles.buttonContainer}>
            {/* Adiciona uma classe CSS condicional com base no estado isLiked */}
            <button
              onClick={handleLike}
              className={`${styles.socialButton} ${
                isLiked ? styles.likedButton : ""
              }`} // Adiciona a classe likedButton se isLiked for verdadeiro
            >
              <img src={Like} alt="Joinha" /> Útil
            </button>
            <button className={styles.socialButton} onClick={scrollToComments}>
              <img src={Comments} alt="Comentários" /> Comentários
            </button>
            <span
              className={styles.bugReport}
              onClick={handleProblemClick}
              style={{ cursor: "pointer" }}
            >
              Informar um Problema
            </span>
            {modalOpen && (
              <InformarProblemaModal
                onSubmit={handleProblemReport}
                callModal={callModal}
                id={rea.id}
              />
            )}
          </div>
        </div>
        <a href={rea.link} target="_blank" rel="noopener noreferrer">
          <img src={url} alt="reaThumb" className={styles.thumbImage} />
        </a>
      </div>

      <ul className={styles.metaData}>
        <li>
          <strong>ID: </strong> {rea.id}
        </li>
        <li>
          <strong>Tipo do Material:</strong> {tipoRecurso[rea.type]}
        </li>
        <li>
          <strong>Área do conhecimento:</strong> {areasConhecimento[rea.subject]}
        </li>
        <li>
          <strong>Tipo de Licença:</strong> {tiposLicenca[rea.rights]}
        </li>
        <li>
          <strong>Público alvo:</strong> {publicoAlvo[rea.audience]}
        </li>
        <li>
          <strong>Idioma:</strong> {idiomas[rea.language]}
        </li>
        {rea.contributor && (
          <li>
            <strong>Contribuidor:</strong> {rea.contributor}
          </li>
        )}
        {rea.coverage && (
          <li>
            <strong>Cobertura:</strong> {rea.coverage}
          </li>
        )}
        {rea.creator && (
          <li>
            <strong>Criador:</strong> {rea.creator}
          </li>
        )}
        {rea.date && (
          <li>
            <strong>Data:</strong> {rea.date ? formatDate(rea.date) : ''}
          </li>
        )}
        {rea.format && (
          <li>
            <strong>Formato:</strong> {formats[rea.format]}
          </li>
        )}
        {rea.publisher && (
          <li>
            <strong>Publicador:</strong> {rea.publisher}
          </li>
        )}
        {rea.source && (
          <li>
            <strong>Fonte:</strong> {rea.source}
          </li>
        )}
        <li>
          <strong>Descrição:</strong> {rea.description}
        </li>
        <li>
          <strong>Instruções de uso:</strong> {rea.instructionalMethod}
        </li>
      </ul>
    </div>
  );
}
