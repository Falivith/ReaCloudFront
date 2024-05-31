import styles from './ExplorerContainer.module.css';
import { ReaCloudStaticLogo } from '../ReaCloudStaticLogo';
import { Filters } from '../Filters';
import { ReaList } from './ReaList';
import { Pagination } from './Pagination';
import { useState } from 'react';

export function ExplorerContainer({ reqConfig }) {

    const [filterData, setFilterData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={styles.container}>
            <ReaCloudStaticLogo />
            <Filters onFilterChange={setFilterData}
                pageSize={pageSize} currentPage={currentPage}
                reqConfigState={reqConfig}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <ReaList filterData={filterData} onFilterChange={setFilterData} isLoading={isLoading} />
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
}
