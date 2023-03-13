import styles from './Filters.module.css';
import Search from '../assets/Search.svg';
import { CustomSelector } from './CustomSelector';
import { useNavigate } from 'react-router-dom';

export function Filters() {

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return (
        <div className = { styles.container }>
            <form className = { styles.internalContainer } action="">
                <input className = { styles.inputSpace } type = "text" placeholder="O que você procura?"/>
                <button className = { styles.searchButton } type = "submit"><img src = { Search } alt="Pesquisar" /></button>
            </form>

            <div className = { styles.selectorExternalContainer }>
                <span className = { styles.blueSpan }>ÁREA DO CONHECIMENTO</span>
                <CustomSelector
                    selectorId = {1}
                    width = {"201px"}
                    height = {"44px"}
                    options = {["Português", "Matemática", "Biologia", "Teologia"]}/> 
            </div>

            <div className = { styles.selectorExternalContainer }>
                <span className = { styles.blueSpan }>TIPO DO MATERIAL</span>
                <CustomSelector
                    selectorId = {2}
                    width = {"200px"}
                    height = {"44px"}
                    options = {["Website", "Vídeo", "Artigo"]}/> 
            </div>

            <button className = { styles.blueSearchButton } onClick={() => routeChangeHandler('/explorer')} >BUSCAR</button>
        </div>
    );
}
