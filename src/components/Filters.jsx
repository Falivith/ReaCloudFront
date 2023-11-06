import React, { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import Search from '../assets/Search.svg';
import { useNavigate } from 'react-router-dom';
import { filterReas } from '../services/reaquerys';
import { useLocation } from 'react-router-dom';
import { SuperSelector } from './SuperSelector';

const knowledgeArea = [
    { name: ' Linguagens', code: 'LI' },
    { name: ' Ciências Exatas', code: 'CE' },
    { name: ' Ciências Biológicas', code: 'CB' },
    { name: ' Ciências Humanas', code: 'CH' },
    { name: ' Anos Iniciais', code: 'AI' }
];

const type = [
    { name: ' Site', code: 'ST' },
    { name: ' Artigo', code: 'ART' },
    { name: ' Documento', code: 'DOC' },
    { name: ' Vídeo', code: 'VID' },
    { name: ' Ferramenta', code: 'TL' }
];

export function Filters({ onFilterChange = () => {}, pageSize, currentPage, reqConfigState, setIsLoading }) {

    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (reqConfigState !== null && reqConfigState !== undefined)
            setSearchValue(reqConfigState.title);
      }, [reqConfigState]);

    const routeChangeHandler = async (route) => {
        await new Promise(resolve => setTimeout(resolve, 1)); 
        navigate(`../${route}`);
    }

    const standardValues = {
        title: '',
        type: '',
        knowledgeArea: '',
        ...(reqConfigState !== null ? reqConfigState : {})
    };
    
    const updateSelected = (id, s) => {
        console.log(id, s);
    
        setReqConfig(prevState => ({
            ...prevState,
            [id]: s
        }));
    }
    
    const [ knowledgeAreaConfig, setKnowledgeAreaConfig ] = useState(null)
    const [ typeConfig, setTypeConfig ] = useState(null)

    const [ reqConfig, setReqConfig ] = useState(standardValues)
    const [ isSubmitted, setIsSubmitted ] = useState(false);

    // Estado para armazenar as seleções dos filtros
    const [searchValue, setSearchValue] = useState('');

    // Função para construir e executar a requisição à API com base nas seleções dos filtros
    const fetchResources = async () => {
        setIsSubmitted(true)
        try {
            setReqConfig(prevState => ({
                ...prevState,
                title: searchValue
            }));
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (location.pathname === '/explorer' ) {
                    setIsLoading(true);

                    const response = await filterReas({
                        "title": reqConfig.title,
                        "knowledge_area": reqConfig.knowledgeArea,
                        "rea_type": reqConfig.type
                    },currentPage,pageSize);
                    
                    onFilterChange(response);
                    setIsLoading(false);
                }

                if (location.pathname === '/' && isSubmitted ) {
                    navigate('/explorer', { state: { reqConfig }});
                }
                
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [reqConfig, currentPage]);

    useEffect(() => {
        updateSelected('knowledgeArea', knowledgeAreaConfig);
        updateSelected('type', typeConfig);
    }, [knowledgeAreaConfig, typeConfig]);

    return (
        <div className={styles.container}>
            <form className={styles.internalContainer} onSubmit={(e) => {
                                                        e.preventDefault(); 
                                                        fetchResources();
            }}>
                <input value={searchValue} className={styles.inputSpace} type="text" placeholder="O que você procura?" onChange={(e) => setSearchValue(e.target.value)}/>
                <button className={styles.searchButton} type="submit"><img src={Search} alt="Pesquisar" /></button>
            </form>

            <div className = { styles.selectorsAndSearch }>

            <div className={styles.selectorExternalContainer}>
                    <span className={styles.blueSpan}>ÁREA DO CONHECIMENTO</span>
                    <SuperSelector options = {knowledgeArea} selectedOptions = { knowledgeAreaConfig } setState = { setKnowledgeAreaConfig } />
                </div>

                <div className={styles.selectorExternalContainer}>
                    <span className={styles.blueSpan}>TIPO DO MATERIAL</span>
                    <SuperSelector options = {type} selectedOptions = { typeConfig } setState = { setTypeConfig }/>
                </div>

                <button className={styles.blueSearchButton} onClick={fetchResources}>BUSCAR</button>
            </div>
        </div>
    );
}
