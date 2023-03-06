import styles from './Profile.module.css'
import '../../global.css'
import { useState } from 'react';

export function ProfileLabelAndInput({labelText, inputType, showButton = true, placeholderText,inputStyle = styles.input}) {
    
    const [readOnly, setReadOnly] = useState(true);
    
    const buttonHandler = (event) =>{
        setReadOnly(false)
    }

    return(
        <div>
            <p className= {styles.text} >{labelText}</p>
                <span className={styles.SpanContainer}>
                    <input type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly = {readOnly}></input>
                    {showButton ?    
                        <button onClick={(event) => buttonHandler(event)} type="button" className={styles.MeuButton} >
                            <img src='src/assets/Editar.png'/>
                        </button>
                        :null
                    }
                </span>
        </div>
    )
}