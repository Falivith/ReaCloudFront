import React, { useState } from 'react';
import styles from './Filters.module.css';
import Search from '../assets/Search.svg';
import { CustomSelector } from './CustomSelector';
import { useNavigate } from 'react-router-dom';

export function Filters() {
    const navigate = useNavigate();

    const standardValues = {
        name: '',
        type: '',
        knowledgeArea: ''
    };
    
    const updateSelected = (id, s) => {
        setValues(prevState => ({
            ...prevState, 
            [id]: s
        }))
    }

    const [ reqConfig, setReqConfig ] = useState(standardValues)

    // Estado para armazenar as seleções dos filtros
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    // Função para construir e executar a requisição à API com base nas seleções dos filtros
    const fetchResources = () => {
        const apiUrl = `/api/resources?area=${selectedArea}&type=${selectedType}`;
        console.log("Req");
        console.log(selectedArea);
        console.log(selectedType);
    }

    return (
        <div className={styles.container}>
            <form className={styles.internalContainer} action="">
                <input className={styles.inputSpace} type="text" placeholder="O que você procura?" />
                <button className={styles.searchButton} type="submit"><img src={Search} alt="Pesquisar" /></button>
            </form>

            <div className={styles.selectorExternalContainer}>
                <span className={styles.blueSpan}>ÁREA DO CONHECIMENTO</span>
                <CustomSelector
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
