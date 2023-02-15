import styles from './Suggestions.module.css'
import { ReaCard } from './ReaCard'

export function Suggestions(){
    return(
        <div className = { styles.externalContainer }>
            <span className = { styles.suggLabel }>Você também pode gostar de...</span>
            <ReaCard/>
            <ReaCard/>
            <ReaCard/>
            <button>Mais recomendações...</button>
        </div>
   )
}
