import { useEffect, useState } from "react";
import styles from "./ReaPreview.module.css";
import Like from "../../assets/Like.png";
import Comments from "../../assets/Comments.png";
import { useNavigate } from "react-router-dom";
import { liked, toggleLike, getLikeCount } from "../../services/reaquerys";
import { BaseNotification } from "../modals/BaseNotification";

export function ReaPreview(props) {
    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}/${props.id}`);
    };

    const routeChangeHandlerComments = (route) => {
        navigate(`../${route}/${props.id}/comments`);
    };

    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(false);
    const [notificationType, setNotificationType] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        checkLike(props.id);
    }, []);

    const checkLike = async () => {
        let response = await liked(props.id);
        let likesCount = await getLikeCount(props.id);
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

    const handleAction = async (event, action) => {
        event.stopPropagation();
        if (action === "like") {
            let response = await toggleLike(props.id)

            if(response.success == false){
                switch(response.message){
                    case 'Nenhum usuário logado.':
                        setNotificationType('likeNotLogged');
                        setShowNotification(true);
                        break;
                    case 'Erro ao adicionar/remover like:':
                        setNotificationType('likeGeneralError');
                        setShowNotification(true);
                        break;
                    default:
                        return;
                }
                return;
            }

            setLiked(response);
            await checkLike();
        } else if (action === "comments") {
            routeChangeHandlerComments("/ReaView")
        }
    };

    return (
        <div
            className={styles.container}
            onClick={() => routeChangeHandler("/ReaView")}
        >
            <BaseNotification
                mode={'absolute'}
                type={notificationType}
                showing={showNotification}
                onClose={() => setShowNotification(false)}
            />
            <div className={styles.thumbContainer}>
                <img
                    onClick={() => routeChangeHandler("/ReaView")}
                    className={styles.dynamicImg}
                    src={props.thumb}
                    alt="thumbPreview"
                />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.text}>
                    <h1
                        onClick={() => routeChangeHandler("/ReaView")}
                        className={styles.reaTitle}
                    >
                        {" "}
                        {props.title}{" "}
                    </h1>
                    <p className={styles.reaDescription}> {props.description} </p>
                    <span className={styles.likesCount}>{getLikesText(likeCount)}</span>
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={(event) => handleAction(event, "like")}
                            className={`${styles.socialButton} ${isLiked ? styles.likedButton : ""
                                }`}
                        >
                            <img src={Like} alt="Joinha" /> Útil
                        </button>

                        <button
                            className={styles.socialButton}
                            onClick={(event) => handleAction(event, "comments")}
                        >
                            <img src={Comments} alt="Comentários" /> Comentários
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
