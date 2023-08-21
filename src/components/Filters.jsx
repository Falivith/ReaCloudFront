import React, { useState } from 'react';
import styles from './Filters.module.css';
import Search from '../assets/Search.svg';
import { CustomSelector } from './CustomSelector';
import { useNavigate } from 'react-router-dom';
import { filterReas } from '../services/reaquerys';

export function Filters() {
    const navigate = useNavigate();

    const standardValues = {
        title: '',
        type: '',
        knowledgeArea: ''
    };
    
    const updateSelected = (id, s) => {
        console.log(id, s);
    
        // Use a variável searchValue que foi definida no componente
        setReqConfig(prevState => ({
            ...prevState,
            [id]: s
        }));
    }

    const [ reqConfig, setReqConfig ] = useState(standardValues)

    // Estado para armazenar as seleções dos filtros
    const [searchValue, setSearchValue] = useState('');

    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    // Função para construir e executar a requisição à API com base nas seleções dos filtros
    const fetchResources = async () => {
        setReqConfig(prevState => ({
            ...prevState,
            title: searchValue
        }));
    
        console.log(reqConfig);
    
        try {
            const response = await filterReas({
                "title": "Kevin",
                "knowledge_area": "Português",
                "rea_type": "Site"
                //"title": reqConfig.title, // Use o título do reqConfig
                //"knowledge_area": reqConfig.knowledgeArea,
                //"rea_type": reqConfig.type
            });
            
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.internalContainer} action="">
                <input className={styles.inputSpace} type="text" placeholder="O que você procura?" onChange={(e) => setSearchValue(e.target.value)}/>
                <button className={styles.searchButton} type="submit"><img src={Search} alt="Pesquisar" /></button>
            </form>

            <div className={styles.selectorExternalContainer}>
                <span className={styles.blueSpan}>ÁREA DO CONHECIMENTO</span>
                <CustomSelector
                    id = "knowledgeArea"
                    selectorId={1}
                    width={"201px"}
                    height={"44px"}
                    options={["Português", "Matemática", "Biologia", "Teologia"]}
                    handleResult = { updateSelected }
                    />
            </div>

            <div className={styles.selectorExternalContainer}>
                <span className={styles.blueSpan}>TIPO DO MATERIAL</span>
                <CustomSelector
                    id = "type"
                    selectorId={2}
                    width={"200px"}
                    height={"44px"}
                    options={["Website", "Vídeo", "Artigo"]}
                    handleResult = { updateSelected } 
                    />
            </div>

            <button className={styles.blueSearchButton} onClick={fetchResources}>BUSCAR</button>
        </div>
    );
}
