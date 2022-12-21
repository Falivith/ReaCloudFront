import styles from './Art.module.css'
import RCart from '../assets/RCart.svg'

export function Art() {
    return (
        <div className = { styles.artContainer }>
            <img src = { RCart } alt="Arte ReaCloud"/>
        </div>
    );
}