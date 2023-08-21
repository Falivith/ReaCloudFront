import styles from './Pagination.module.css';
import Preview from '../../assets/LeftArrow.svg';
import Next from '../../assets/RightArrow.svg';

export function Pagination(){
    return(
        <div className = { styles.pagination }>
            <a href="#"><img src = { Preview } alt="preview" /></a>
            <a href="#">1</a>
            <a href="#" className = { styles.active }>2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#"><img src = { Next } alt="next" /></a>
        </div>
    )
}
