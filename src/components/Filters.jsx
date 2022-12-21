import styles from './Filters.module.css'
import Search from '../assets/Search.svg'

export function Filters() {
    return (
        <div className = { styles.container }>
            <form className = { styles.internalContainer } action="">
                <input className = { styles.inputSpace } type = "text" placeholder="O que você procura?"/>
                <button className = { styles.searchButton } type = "submit"><img src = { Search } alt="Pesquisar" /></button>
            </form>

            <div className = { styles.selectorExternalContainer }>
                <span className = { styles.blueSpan }>Área do Conhecimento</span>
                <div className = { styles.lsCustomSelect }>
                    <select className = { styles.lsSelect } name = "area-conhecimento">
                        <option value="0">Todas</option>
                        <option value="1">Português</option>
                        <option value="2">Matemática</option>
                    </select>
                    <span className = { styles.customArrow }></span>
                </div>
            </div>

            <div className = { styles.selectorExternalContainer }>
                <span className = { styles.blueSpan }>Tipo do Material</span>
                <div className = { styles.lsCustomSelect }>
                    <select className = { styles.lsSelect } name = "tipo-material">
                        <option value="0">Todos</option>
                        <option value="1">Vídeo</option>
                        <option value="2">Site</option>
                        <option value="3">Artigo</option>
                        <option value="4">Documento</option>
                    </select>
                    <span className = { styles.customArrow }></span>
                </div>  
            </div>

            <button className = { styles.blueSearchButton }>BUSCAR</button>
        </div>
    );
}