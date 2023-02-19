import styles from './Comment.module.css';
import char1 from '../../assets/Char1.png';
import char2 from '../../assets/Char2.png';

export function Comment(){
    return(
        <div className = { styles.container }>
            <div className = { styles.profilePhotoContainer }>
                <img className = { styles.profilePhoto } src = { char1 } alt="" />
            </div>
            <div className = { styles.textContainer }>
                <span className = { styles.commentTitle }>Título/Nome</span>
                <p className = { styles.commentContent }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae error, excepturi officia unde perspiciatis odit aperiam dignissimos et ratione, esse quasi eius. Laboriosam ipsa illum consequatur mollitia numquam voluptas asperiores.</p>
            </div>
        </div>
    )
}
