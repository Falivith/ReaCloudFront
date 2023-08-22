import styles from './ExtensionAd.module.css';
import CloseSymbol from '../../assets/CloseX.png';
import reaCloudLogo from '../../assets/RClogoBlue.svg'

export function ExtensionAd(props){

    const close = () => {

        if (props.onClose) {
            props.onClose();
        }
    };

    return props.showing ? (
        <div className = { styles.backgroundColorAndContainer }>
            <div className = { styles.background }>
                <header className = { styles.header }>
                    <h1 className = { styles.title } > Experimente a Mochila ReaCloud </h1>
                    <img onClick = { close } src = { CloseSymbol } alt = "Fechar" className = { styles.close }/>
                </header>
                    <p className = { styles.description }>
                        A nossa extensão oferece uma maneira simples de coletar 
                        informações de recursos educacionais online. Com ela, 
                        você pode extrair automaticamente títulos, descrições e 
                        links de páginas da web que contenham recursos úteis. 
                        Economize tempo, mantenha seus recursos organizados e 
                        acesse facilmente o que você encontrou.
                    </p>

                    <a className = { styles.link } href="https://chrome.google.com/webstore/detail/reacloud/flnllibpodbojpadpmpajmggfjchabdp/related?hl=pt-BR">
                        <p> Link da Chrome Web Store </p>
                        <img src = {reaCloudLogo} alt="Logotipo do ReaCloud"/>
                    </a>
            </div>
        </div>
    ) : null;
}
