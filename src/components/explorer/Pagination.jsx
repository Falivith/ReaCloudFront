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
        console.log("currentPage = ",currentPage)
        event.preventDefault();
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className={styles.pagination}>
            <a href="#"><img src={Preview} alt="preview" /></a>
            {[1, 2, 3, 4, 5, 6].map((page) => (
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