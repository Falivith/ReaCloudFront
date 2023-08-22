import '../global.css';
import { Header } from '../components/Header';
import { Help } from '../components/Help'
import { ExplorerContainer } from '../components/explorer/ExplorerContainer';

/* Atributos Dinâmicos
    title: ""
    description: "",
    likes: int,
    thumb_url: ""
*/

export function Explorer() {
  return(
    <div>
        <Header/>
        <ExplorerContainer/>
        <Help/>
    </div>
  )
}
