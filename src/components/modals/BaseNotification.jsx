import styles from "./BaseNotification.module.css";
import WarningSymbol from "../../assets/WarningSymbol.png";
import CheckSymbol from "../../assets/CheckSymbol.png";
import DangerSymbol from "../../assets/DangerSymbol.png";
import CloseSymbol from "../../assets/CloseX.png";
import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

export function BaseNotification(props) {
  const nodeRef = useRef(null);

  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    if (props.showing) {
      const timer = setTimeout(() => {
        close();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [props.showing]);

  let notificationProps;

  switch (props.type) {
    case "likeNotLogged":
      notificationProps = {
        img: WarningSymbol,
        title: "Falha ao tentar avaliar o recurso.",
        description: "Você não está logado. Faça login para poder avaliar.",
        backgroundcolor: "#EE7700",
        textcolor: "#EE7700",
      };
      break;

    case "likeGeneralError":
      notificationProps = {
        img: DangerSymbol,
        title: "Falha ao tentar avaliar o recurso.",
        description: "Verifique sua conexão e tente mais tarde.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveReaErrorNetwork":
      notificationProps = {
        img: DangerSymbol,
        title: "Falha ao tentar postar comentário.",
        description: "Verifique sua conexão e tente mais tarde.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveCommentBadRequest":
      notificationProps = {
        img: WarningSymbol,
        title: "Falha ao tentar postar comentário.",
        description: "Tente novamente mais tarde.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveCommentUnlogged":
      notificationProps = {
        img: WarningSymbol,
        title: "Você não está logado.",
        description: "Cadastre-se ou faça login para poder comentar.",
        backgroundcolor: "#EE7700",
        textcolor: "#EE7700",
      };
      break;

    case "savePerfilSuccess":
      notificationProps = {
        img: CheckSymbol,
        title: "Dados salvos com sucesso!",
        description: "Seu perfil foi atualizado.",
        backgroundcolor: "#22BB55",
        textcolor: "#22BB55",
      };
      break;

    case "saveReaSuccess":
      notificationProps = {
        img: CheckSymbol,
        title: "Dados salvos com sucesso!",
        description: "Seu recurso foi salvo.",
        backgroundcolor: "#22BB55",
        textcolor: "#22BB55",
      };
      break;

    case "saveReaError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao criar o recurso.",
        description:
          "Por favor, tente novamente. Lembre-se que todos os campos, incluindo a imagem do recurso são obrigatórios.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveReaNetworkError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao criar o recurso.",
        description:
          "Por favor, verifique sua conexão com a internet e tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveReaInternalError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro interno.",
        description: "Ocorreu um erro interno, por favor tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao salvar os dados",
        description: "Por favor, tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveErrorLogin":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao salvar os dados",
        description: "Nome ou email inválidos!",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "saveReaErrorUnloged":
      notificationProps = {
        img: WarningSymbol,
        title: "Você não está logado.",
        description:
          "Faça login no ReaCloud para poder adicionar seus Recursos.",
        backgroundcolor: "#EE7700",
        textcolor: "#EE7700",
      };
      break;

    case "signupError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao cadastrar usuário.",
        description: "Verifique a sua conexão e tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "loginError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao fazer login.",
        description: "Verifique a sua conexão e tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "reaIssueError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao enviar problema.",
        description: "Verifique a sua conexão e tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "reaIssueErrorLogin":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao enviar problema.",
        description: "Você precisa estar logado para enviar um problema.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "reaIssueSuccess":
      notificationProps = {
        img: CheckSymbol,
        title: "Sucesso!",
        description: "Seu problema foi enviado.",
        backgroundcolor: "#22BB55",
        textcolor: "#22BB55",
      };
      break;

    case "editReaSuccess":
      notificationProps = {
        img: CheckSymbol,
        title: "Sucesso!",
        description: "Seu recurso foi editado.",
        backgroundcolor: "#22BB55",
        textcolor: "#22BB55",
      };
      break;

    case "editReaErrorUnloged":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao editar recurso.",
        description: "Você precisa estar logado para editar um recurso.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "editReaError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao editar recurso.",
        description: "Por favor, tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "passwordSuccess":
      notificationProps = {
        img: CheckSymbol,
        title: "Senha alterada com sucesso!",
        description: "Sua senha foi atualizada.",
        backgroundcolor: "#22BB55",
        textcolor: "#22BB55",
      };
      break;

    case "passwordWarning":
      notificationProps = {
        img: WarningSymbol,
        title: "A senha escolhida não é segura.",
        description:
          "Atente-se aos requisitos para escolher uma senha mais forte.",
        backgroundcolor: "#EE7700",
        textcolor: "#EE7700",
      };
      break;

    case "passwordError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao alterar senha.",
        description: "Por favor, tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    case "deleteUserError":
      notificationProps = {
        img: DangerSymbol,
        title: "Erro ao remover usuário.",
        description: "Por favor, tente novamente.",
        backgroundcolor: "#D30000",
        textcolor: "#D30000",
      };
      break;

    default:
      notificationProps = {
        img: WarningSymbol,
        title: "Notificação Indefinida",
        description: "Envie alguma propriedade de notificação, dev!",
        backgroundcolor: "#22BB55",
        textcolor: "#22BB55",
      };
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.showing}
      timeout={500}
      classNames={{
        enter: styles["slide-enter"],
        enterActive: styles["slide-enter-active"],
        exit: styles["slide-exit"],
        exitActive: styles["slide-exit-active"],
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={nodeRef}
        className={styles.backgroundColorAndContainer}
        style={{ backgroundColor: notificationProps.backgroundcolor }}
      >
        <div className={styles.background}>
          <header className={styles.header}>
            <div>
              <img src={notificationProps.img} alt="Notification Symbol" />
              <h1
                className={styles.title}
                style={{ color: notificationProps.textcolor }}
              >
                {" "}
                {notificationProps.title}{" "}
              </h1>
            </div>
            <img
              onClick={close}
              src={CloseSymbol}
              alt="Fechar"
              className={styles.close}
            />
          </header>
          <p className={styles.description}>
            {" "}
            {notificationProps.description}{" "}
          </p>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
}
