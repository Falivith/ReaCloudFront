import styles from './ExplorerContainer.module.css';
import { ReaCloudStaticLogo } from '../ReaCloudStaticLogo';
import { Filters } from '../Filters';
import { ReaList } from './ReaList';
import { Pagination } from './Pagination';
import { useState } from 'react';

export function ExplorerContainer (){
    
  const [filterData, setFilterData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

    return(
        <div className = { styles.container }>
            <ReaCloudStaticLogo/>
            <Filters onFilterChange={setFilterData} 
                     pageSize = {pageSize} currentPage = {currentPage}   
            />
            <ReaList filterData={filterData} onFilterChange={setFilterData} />
            <Pagination setCurrentPage = {setCurrentPage} currentPage = {currentPage}  />
        </div>
    );
}
