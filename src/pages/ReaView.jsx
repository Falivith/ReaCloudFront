import { Header } from '../components/Header';
import { ReaPanel } from '../components/reaview/ReaPanel';
import { Suggestions } from '../components/reaview/Suggestions';
import styles from '../App.module.css';

export function ReaView() {
    return(
      <div>
          <Header/>
          <div className = { styles.reaViewContainer }>
            <ReaPanel/>
            <Suggestions/> 
          </div>
      </div>
    )
}
