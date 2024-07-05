import styles from './ExplorerContainer.module.css';
import { ReaCloudStaticLogo } from '../ReaCloudStaticLogo';
import { Filters } from '../Filters';
import { ReaList } from './ReaList';
import { Pagination } from './Pagination';
import { useState } from 'react';

export function ExplorerContainer({ reqConfig }) {
    const [filterData, setFilterData] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);


    return (
        <div className={styles.container}>
            <ReaCloudStaticLogo />
            <Filters
                onFilterChange={setFilterData}
                pageSize={pageSize}
                currentPage={currentPage}
                reqConfigState={reqConfig}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setTotalPages={setTotalPages} // Pass setTotalPages to Filters
            />
            <ReaList
                filterData={filterData}
                onFilterChange={setFilterData}
                isLoading={isLoading}
            />
            <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}
