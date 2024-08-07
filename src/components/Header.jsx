import styles from "./Header.module.css";
import ReaCloudLogo from "../assets/RClogo.svg";
import RecursosEducacionaisLogo from "../assets/Add_ring.png";
import SairLogo from "../assets/Close_round_light.png";
import UserLogo from "../assets/User_circle_light.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { isLogged, loginWithGoogle, getProfilePicture } from "../services/authentication";

export function Header() {
  const extensionId = import.meta.env.VITE_REACLOUD_EXTENSION_ID;
  const [reasPluginCount, setReasPluginCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn from localStorage if available
    const savedLoginState = localStorage.getItem("isLoggedIn");
    return savedLoginState ? JSON.parse(savedLoginState) : null;
  });
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [profilePicture, setProfilePicture] = useState(null);
  
  const signIn = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const status = await loginWithGoogle(code);
      setIsLoggedIn(status);
      localStorage.setItem("isLoggedIn", JSON.stringify(status)); // Save to localStorage
      navigate("/");
    },
    flow: "auth-code",
  });

  const handleClick = (event) => {
    event.preventDefault();
    signIn();
  };

  useEffect(() => {
    if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(
        extensionId,
        { getTargetData: true },
        (response) => {
          if (response && response.setTargetData) {
            setReasPluginCount(response.setTargetData.length);
          }
        }
      );
    }
  }, [extensionId]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLogged();
      setIsLoggedIn(loggedIn);
      localStorage.setItem("isLoggedIn", JSON.stringify(loggedIn));
    };
  
    const getProfilePic = async () => {
      try {
        const pic = await getProfilePicture();
        console.log(pic);
        setProfilePicture(pic);
      } catch (error) {
        console.error('Failed to fetch profile picture:', error);
        setProfilePicture(null);
      }
    };
  
    getProfilePic();
    checkLoginStatus();
  }, []);

  const routeChangeHandler = (route) => {
    navigate(`/${route}`);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.home}>
        <img
          onClick={() => routeChangeHandler("")}
          className={styles.reaCloudHat}
          src={ReaCloudLogo}
          alt="Logotipo da ReaCloud"
        />
        <span
          onClick={() => routeChangeHandler("")}
          className={styles.reaCloudLogoText}
        >
          ReaCloud
        </span>
      </div>
      <div className={styles.buttons}>
        {isLoggedIn === null ? (
          <div
            className={styles.buttons}
            style={{ visibility: "hidden" }}
          ></div>
        ) : isLoggedIn ? (
          <div className={styles.buttons}>
            <img
              onClick={() => routeChangeHandler("addrea")}
              className={styles.reaCloudLogo}
              src={RecursosEducacionaisLogo}
              alt="Adicionar Recurso"
            />
            {reasPluginCount > 0 && (
              <span className={`badge ${styles.badge}`}>{reasPluginCount}</span>
            )}
            <button
              className={styles.buttonsLogged}
              onClick={() => routeChangeHandler("addrea")}
            >
              ADICIONAR RECURSO
            </button>
            <img
              onClick={() => routeChangeHandler("profile")}
              className={styles.profilePicture}
              src={profilePicture ? profilePicture : UserLogo}
              alt="Perfil do Usuário"
            />
            <button
              className={styles.buttonsLogged}
              onClick={() => routeChangeHandler("profile")}
            >
              MEU PERFIL
            </button>
            <img
              onClick={logout}
              className={styles.sairLogo}
              src={SairLogo}
              alt="Sair"
            />
            <button className={styles.buttonsLogged} onClick={logout}>
              SAIR
            </button>
          </div>
        ) : (
          <span className={styles.loginButtons}>
            <button
              onClick={() => routeChangeHandler("addrea")}
              className={styles.addReaButton}
            >
              ADICIONAR RECURSO
            </button>
            <div className={styles.loginAndSignup}>
              <button className={styles.loginButton} onClick={handleClick}>
                ENTRE
              </button>
              {" OU "}
              <button onClick={handleClick} className={styles.loginButton}>
                CADASTRE-SE
              </button>
            </div>
          </span>
        )}
      </div>
    </header>
  );
}
