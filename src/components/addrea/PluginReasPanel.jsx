import styles from './PluginReasPanel.module.css'
import AddRing from "../../assets/Add_ring_green.png";

export function PluginReasPanel(){
    return(
        <div className = { styles.container }>
            <div className = { styles.header }>
                <div className = { styles.addNewReasLabel }>
                    <img src = { AddRing } alt = "Adicionar novos recursos" />
                    <h1>Adicionar novos recursos</h1>                    
                </div>
                <span>Você tem <span className = { styles.pluginReaCounter }>3</span> recursos salvos que ainda não foram adicionados.</span>
            </div>
            <div className = { styles.pluginRequester }>
                Histórico dos Recursos Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis, hic. Inventore atque incidunt, excepturi unde tempora cum soluta eius magni a repellat nemo quas non ad harum aperiam laborum iste.
            </div>
            <footer>
                <p className = { styles.footerSpan }>Além do plugin, você pode adicionar um recurso próprio que está armazenado online (ex: Google Drive, Dropbox, etc)</p>
                <button className = { styles.addOwnReaButton }>ADICIONAR RECURSO PRÓPRIO</button>
            </footer>
        </div>
    )
}
