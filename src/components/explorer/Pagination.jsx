import styles from './Pagination.module.css';
import Preview from '../../assets/LeftArrow.svg';
import Next from '../../assets/RightArrow.svg';

export function Pagination({ setCurrentPage,currentPage }) {
    const handlePageClick = (event) => {
        event.preventDefault();
        const newPage = parseInt(event.target.innerHTML);
        setCurrentPage(newPage);
    };

    const handleNextClick = (event) => {
        event.preventDefault();
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousClick = (event) => {
        event.preventDefault();
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; 
        const halfWindow = Math.floor(maxPagesToShow / 2);
        let startPage = Math.max(currentPage - halfWindow, 1);
        let endPage = startPage + maxPagesToShow - 1;

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <a onClick={handlePreviousClick} href="#"><img src={Preview} alt="preview" /></a>
            {getPageNumbers().map((page) => (
                <a 
                    href="#" 
                    key={page} 
                    onClick={handlePageClick} 
                    className={page === currentPage ? styles.active : ''}
                >
                    {page}
                </a>
            ))}
            <a href="#" onClick={handleNextClick}><img src={Next} alt="next" /></a>
        </div>
    );
}