import styles from './Profile.module.css'
import '../../global.css'

export function ProfileLabelAndInput({labelText, inputType, showButton = true, placeholderText,inputStyle = styles.input}) {
    return(
        
        <div>
            <p className= {styles.text} >{labelText}</p>
                <span className={styles.SpanContainer}>
                    <input type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly={true}></input>
                    {showButton ?    
                        <button type="button" className={styles.MeuButton} ><img src='src/assets/Editar.png'/></button>
                        :null
                    }
                </span>
        </div>
    )
}