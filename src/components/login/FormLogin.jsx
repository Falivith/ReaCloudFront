import styles from "./FormLogin.module.css";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { BaseNotification } from "../modals/BaseNotification";
import { useState } from "react";

const styleImage = {
  marginTop: "1rem",
  marginBottom: "0.75rem",
  width: "1.25rem",
  height: "1.25rem",
  marginRight: "0.4rem",
};

export function FormLogin() {
  const signIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      navigate("/");
    },
  });

  const handleClick = (event) => {
    event.preventDefault();
    signIn();
  };

  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <form className={styles.container}>
      {
        <BaseNotification
          type={notificationType}
          showing={showNotification}
          onClose={closeNotification}
        />
      }

      <div className={styles.containerForButtons}>
        <button
          onClick={handleClick}
          id="signInDiv"
          className={styles.containerButtons}
        >
          <div className={styles.googleImgContainer}>
            <img src={"Google.png"} style={styleImage} />
          </div>
          <span className={styles.spanText}> ENTRAR COM O GOOGLE </span>
        </button>
      </div>
    </form>
  );
}
