import styles from './Art.module.css'
import RCart from '../assets/RCArt1.png'

export function Art() {
    return (
        <div className = { styles.artContainer }>
            <img src = { RCart } alt="Arte ReaCloud"/>
        </div>
    );
}