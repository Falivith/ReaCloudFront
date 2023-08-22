import '../global.css';
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { Help } from '../components/Help'
import { ExplorerContainer } from '../components/explorer/ExplorerContainer';
import { ReaList } from '../components/explorer/ReaList';
import { Pagination } from '../components/explorer/Pagination';
import { useState } from 'react';


/* Atributos Dinâmicos
    title: ""
    description: "",
    likes: int,
    thumb_url: ""
*/

export function Explorer() {

  const [filterData, setFilterData] = useState(null);

  return(
    <div>
        <Header/>
        <ExplorerContainer/>
        <Filters onFilterChange={setFilterData} />
        <ReaList filterData={filterData} onFilterChange={setFilterData} />
        <Pagination/>
        <Help/>
    </div>
  )
}
