import styles from './Comment.module.css';

export function Comment({ nome, text, date, foto }) {
    let url;

    if (foto) {
        const uint8Array = new Uint8Array(foto.data);
        const blob = new Blob([uint8Array], { type: 'image/png' });
        url = URL.createObjectURL(blob);
    }

    const formattedDate = new Date(date).toLocaleDateString();
    const formattedTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.container}>
            <div className={styles.profilePhotoContainer}>
                {foto && <img className={styles.profilePhoto} src={url} alt="Foto do perfil" />}
            </div>
            <div className={styles.commentDetails}>
                <div className={styles.textContainer}>
                    <span className={styles.commentTitle}>{nome}</span>
                    <p className={styles.commentContent}>{text}</p>
                </div>
                <div className={styles.commentActions}>
                    <button className={styles.deleteButton}>Excluir</button>
                    <p className={styles.commentDate}>{formattedDate} {formattedTime}</p>
                </div>
            </div>
        </div>
    );
}
