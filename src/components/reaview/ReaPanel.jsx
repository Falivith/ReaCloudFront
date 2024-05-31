import styles from './ReaPanel.module.css';
import Like from '../../assets/Like.png';
import Comments from '../../assets/Comments.png';
import Loading from '../Loading';

export function ReaPanel({ isLoading, rea }) {

    let url;

    if (rea) {
        let uint8Array = new Uint8Array(rea.thumb);
        let blob = new Blob([uint8Array], { type: "Buffer" });
        url = URL.createObjectURL(blob);

        if (rea.thumb) {
            uint8Array = new Uint8Array(rea.thumb.data);
            blob = new Blob([uint8Array], { type: "Buffer" });
            url = URL.createObjectURL(blob);
        }
    }

    if (isLoading) {
        return(
        <div className = { styles.containerLoading }>
            <Loading />;
        </div>    
        )
    }

    return (
        <div className = { styles.container }>
            <div className = { styles.thumbAuxContainer }>
                <div className = { styles.previewContainer }>
                    <h1 className = { styles.reaTitle }>{ rea.title }</h1>
                    <span className = { styles.likesCount }>948 pessoas acharam isso útil</span>
                    <div className = { styles.buttonContainer }>
                        <button className = { styles.socialButton }> <img src = { Like } alt = "Joinha" /> Útil </button>
                        <button className = { styles.socialButton }> <img src = { Comments } alt = "Comentários" /> Comentários </button>
                        <a className = { styles.bugReport } href = "https://github.com/Falivith" target='_blank'> Informar um Problema </a>
                    </div>
                </div>
                <a href= { rea.link } target="_blank" rel="noopener noreferrer">
                    <img src={url} alt="reaThumb" className={styles.thumbImage} />
                </a> 
            </div>
           
            <ul className={styles.metaData}>
            <li>
                <strong>Tipo do Material:</strong> {rea.reaType}
            </li>
            <li>
                <strong>Área do conhecimento:</strong> {rea.knowledgeArea}
            </li>
            <li>
                <strong>Tipo de Licença:</strong> {rea.license}
            </li>
            <li>
                <strong>Público alvo:</strong> {rea.targetPublic}
            </li>
            <li>
                <strong>Idioma:</strong> {rea.language}
            </li>
            <li>
                <strong>Descrição:</strong> {rea.description}
            </li>
            <li>
                <strong>Instruções de uso:</strong> {rea.instructions}
            </li>
        </ul>
        </div>
    );
}
