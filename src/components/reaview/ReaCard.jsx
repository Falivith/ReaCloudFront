import styles from './ReaCard.module.css';
import arrow from '../../assets/AcessArrow.png';

export function ReaCard(props){
    return(
        <div>
            <article className = { styles.cardContainer}>
                <header className = { styles.cardHeader }>
                    <h1 className = { styles.title }>{ props.title }</h1>
                    <div className = { styles.subjectContainer }>
                        <a href="#" className = { styles.subject }>{ props.subject }</a>
                        <a href="#" className = { styles.subject }>{ props.media_type }</a> 
                    </div>
                </header>
                <p className = { styles.cardDescription } > { props.description }</p>

            </article>
            <button className = { styles.accessRea }>
                <a href="#" className = { styles.pageAnchor }> ACESSAR </a>
                <img src = { arrow } alt="Seta para acessar o REA" />
            </button>                 
        </div>

    )
}
