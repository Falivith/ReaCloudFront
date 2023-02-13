import '../global.css'
import { Header } from '../components/Header'
import { Welcome } from '../components/Welcome'
import { Filters } from '../components/Filters'
import { Art } from '../components/Art'
import { Help } from '../components/Help'
import styles from '../App.module.css'

export function MainPage() {
  return(
    <div>
        <Header/>
        <div className = { styles.wrapper }>
          <Welcome/>
        </div>
          <Filters/>
          <Art/>
          <Help/>
    </div>
  )
}
