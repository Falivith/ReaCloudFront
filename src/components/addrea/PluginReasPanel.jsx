import styles from './PluginReasPanel.module.css'
import AddRing from "../../assets/Add_ring_green.png";
import { PluginResourceContainer } from "./PluginResourceContainer";
import { useNavigate } from 'react-router-dom';

const reas = [
    {
        id: 1,
        title: "Histórico dos Recursos Educacionais Abertos no Brasil e no Mundo",
    },
    {
        id: 2,
        title: "Escolas, universidades, ONGs, governos, etc.",
    },
    {
        id: 3,
        title: "Licenças de direito autoral e Creative Commons, formatos abertos e formatos fechados",
    }
];

export function PluginReasPanel(){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return(
        <div className = { styles.container }>
            <div className = { styles.header }>
                <div className = { styles.addNewReasLabel }>
                    <img src = { AddRing } alt = "Adicionar novos recursos" />
                    <h1>Adicionar novos recursos</h1>                    
                </div>
                <span>Você tem <span className = { styles.pluginReaCounter }>3</span> recursos na sua mochila.</span>
            </div>
            <div className = { styles.pluginRequester }>
                {reas.map(rea => {
                    return <PluginResourceContainer
                        key = {rea.id}
                        title = {rea.title}
                    />
                    })
                }
            </div>
            <footer className = { styles.footerPluginReas }>
                <p className = { styles.footerSpan }>Além do plugin, você pode adicionar um recurso próprio que está armazenado online (ex: Google Drive, Dropbox, etc)</p>
                <button className = { styles.addOwnReaButton } onClick={() => routeChangeHandler('/reaeditadd')} >ADICIONAR RECURSO PRÓPRIO</button>
            </footer>
        </div>
    )
}
