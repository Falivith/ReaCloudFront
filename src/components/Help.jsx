import styles from './Help.module.css'
import HelpImg from '../assets/Help.svg'

export function Help(){
    return (
        <div className = { styles.help } >
            <img src = { HelpImg } alt="Ajuda"/>
        </div>
    )
}
