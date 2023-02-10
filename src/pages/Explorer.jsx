import '../global.css';
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { Help } from '../components/Help'
import { ExplorerContainer } from '../components/ExplorerContainer';
import { ReaList } from '../components/ReaList';
import styles from '../App.module.css';

export function Explorer() {
  return(
    <div>
        <Header/>
        <ExplorerContainer/>
        <Filters/>
        <ReaList/>
        <Help/>
    </div>
  )
}
