import '../global.css';
import { Header } from '../components/Header';
import { Help } from '../components/Help'
import { ExplorerContainer } from '../components/explorer/ExplorerContainer';
import { useLocation } from 'react-router-dom';

export function Explorer() {
  const location = useLocation();
  const reqConfig = location.state.reqConfig
  return(
    <div>
        <Header/>
        <ExplorerContainer reqConfig = {reqConfig}/>
        <Help/>
    </div>
  )
}
