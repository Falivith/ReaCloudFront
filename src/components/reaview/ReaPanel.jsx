import styles from './ReaPanel.module.css';
import Like from '../../assets/Like.png';
import Comments from '../../assets/Comments.png';
import ReaThumb from '../../assets/ExampleRea.png';
import { useState } from 'react';
export function ReaPanel(){

    const [tipoMaterial, setTipoMaterial] = useState('Website');
    const [areaConhecimento, setAreaConhecimento] = useState('Matemática');
    const [tipoLicenca, setTipoLicenca] = useState('Creative Commons');
    const [publicoAlvo, setPublicoAlvo] = useState('Ensino Fundamental');
    const [idioma, setIdioma] = useState('Português');
    const [descricao, setDescricao] = useState('Lorem, ipsum dolor sit amet consectetur adipisicing elit...');
    const [instrucoesUso, setInstrucoesUso] = useState('Lorem ipsum dolor sit amet consectetur, adipisicing elit...');

    return (
        <div className = { styles.container }>
            <div className = { styles.thumbAuxContainer }>
                <div className = { styles.previewContainer }>
                    <h1 className = { styles.reaTitle }>Atividades de Matemática de acordo com a BNCC</h1>
                    <span className = { styles.likesCount }>948 pessoas acharam isso útil</span>
                    <div className = { styles.buttonContainer }>
                        <button className = { styles.socialButton }> <img src = { Like } alt = "Joinha" /> Útil </button>
                        <button className = { styles.socialButton }> <img src = { Comments } alt = "Joinha" /> Comentários </button>
                        <a className = { styles.bugReport } href = "#"> Informar um Problema </a>
                    </div>
                </div>
                <img src = { ReaThumb } alt="reaThumb" />  
            </div>
           
            <ul className={styles.metaData}>
            <li>
                <strong>Tipo do Material:</strong> {tipoMaterial}
            </li>
            <li>
                <strong>Área do conhecimento:</strong> {areaConhecimento}
            </li>
            <li>
                <strong>Tipo de Licença:</strong> {tipoLicenca}
            </li>
            <li>
                <strong>Público alvo:</strong> {publicoAlvo}
            </li>
            <li>
                <strong>Idioma:</strong> {idioma}
            </li>
            <li>
                <strong>Descrição:</strong> {descricao}
            </li>
            <li>
                <strong>Instruções de uso:</strong> {instrucoesUso}
            </li>
        </ul>
        </div>
    );
}
