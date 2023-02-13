import '../global.css';
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { Help } from '../components/Help'
import { ExplorerContainer } from '../components/ExplorerContainer';
import { ReaList } from '../components/ReaList';
import { Pagination } from '../components/Pagination';

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
        <Filters/>
        <ReaList/>
        <Help/>
        <Pagination/>
    </div>
  )
}
