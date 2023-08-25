import styles from './PluginReasPanel.module.css'
import AddRing from "../../assets/Add_ring_green.png";
import { PluginResourceContainer } from "./PluginResourceContainer";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function PluginReasPanel(){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    var ExtensionId = "hhglkeeogekcimonpepemfjabkikbimh"

    const [reasPlugin, setReasPlugin] = useState([]);
    const [reasPluginCount, setReasPluginCount] = useState(0);

    useEffect(() => {
        const extensionId = ExtensionId;
        if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage(extensionId, { getTargetData: true }, (response) => {
                if (response && response.setTargetData) {
                    setReasPlugin(response.setTargetData);
                    setReasPluginCount(response.setTargetData.length)
                    console.log(response.setTargetData);
                }
            });
        }
    }, []);

    return(
        <div className = { styles.container }>
            <div className = { styles.header }>
                <div className = { styles.addNewReasLabel }>
                    <img src = { AddRing } alt = "Adicionar novos recursos" />
                    <h1>Adicionar novos recursos</h1>                    
                </div>
                <span>Você tem <span className = { styles.pluginReaCounter }> { reasPluginCount } </span> recurso(s) na sua mochila.</span>
            </div>
            <div className = { styles.pluginRequester }>
                {reasPlugin.map((rea, index) => {
                    return <PluginResourceContainer
                        index = {index}
                        rea = {rea}
                    />
                    })
                }
            </div>
            <footer className = { styles.footerPluginReas }>
                <p className = { styles.footerSpan }>Além do plugin, você pode adicionar o link de um recurso próprio que está armazenado online (ex: Google Drive, Dropbox, etc)</p>
                <button className = { styles.addOwnReaButton } onClick={() => routeChangeHandler('/reaeditadd')} >ADICIONAR RECURSO PRÓPRIO</button>
            </footer>
        </div>
    )
}
