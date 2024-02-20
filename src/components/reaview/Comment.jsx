import styles from './Comment.module.css';

export function Comment({ nome, text, date, foto }) {
    let url;

    if (foto) {
        const uint8Array = new Uint8Array(foto.data);
        const blob = new Blob([uint8Array], { type: 'image/png' });
        url = URL.createObjectURL(blob);
    }

    return (
        <div className={styles.container}>
            <div className={styles.profilePhotoContainer}>
                {foto && <img className={styles.profilePhoto} src={url} alt="Foto do perfil" />}
            </div>
            <div className={styles.textContainer}>
                <span className={styles.commentTitle}>{nome}</span>
                <p className={styles.commentContent}>{text}</p>
                <p className={styles.commentDate}>{new Date(date).toLocaleString()}</p>
            </div>
        </div>
    );
}
