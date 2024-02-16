import styles from './Comment.module.css';

export function Comment({ nome, text, date, foto }) {
    return (
        <div className={styles.container}>
            <div className={styles.profilePhotoContainer}>
                <img className={styles.profilePhoto} src={foto} alt="Foto do perfil" />
            </div>
            <div className={styles.textContainer}>
                <span className={styles.commentTitle}>{nome}</span>
                <p className={styles.commentContent}>{text}</p>
                <p className={styles.commentDate}>{new Date(date).toLocaleString()}</p>
            </div>
        </div>
    );
}
