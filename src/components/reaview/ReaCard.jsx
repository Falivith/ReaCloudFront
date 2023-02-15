import styles from './ReaCard.module.css'

export function ReaCard(props){
    return(
        <article className = { styles.cardContainer}>
            <header>
                <h1 className = { styles.title }>{ props.title }</h1>
                <a href="#" className = { styles.subject }>{ props.subject1 }</a>
                <a href="#" className = { styles.subject }>{ props.subject2 }</a>
            </header>
            <p className = { styles.cardDescription } ></p>
            <footer>
                <a href="#" className = { styles.pageAnchor }></a>
            </footer>
        </article>        
    )
}
