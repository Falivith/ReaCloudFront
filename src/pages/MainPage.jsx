import 'src/global.css';
import { Header } from 'src/components/Header';
import { Welcome } from 'src/components/Welcome';
import { Filters } from 'src/components/Filters';
import { Art } from 'src/components/Art';
import styles from 'src/App.module.css';
import Help from 'src/assets/Help.svg'

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
