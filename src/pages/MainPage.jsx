import '../global.css';
import { Header } from '../components/Header';
import { Welcome } from '../components/Welcome';
import { Filters } from '../components/Filters';
import { Art } from '../components/Art';
import styles from '../App.module.css';
import Help from '../assets/Help.svg'

export function MainPage() {
  return(
    <div>
        <Header/>
        <div className = { styles.wrapper }>
          <Welcome/>
        </div>
          <Filters/>
          <Art/>
          <div className = { styles.help } >
            <img src = { Help } alt="Ajuda"/>
          </div>
      </div>
)
}