import styles from './Profile.module.css'
import '../../global.css'
import { useState } from 'react';

export function ProfileLabelAndInput({labelText, inputType, showButton = true, placeholderText,inputStyle = styles.input}) {
    
    const [readOnly, setReadOnly] = useState(true);
    const [buttonClass, setButtonClass] = useState(true);
    
    const buttonHandler = (event) =>{
        setReadOnly(prevReadOnly => !prevReadOnly)
        setButtonClass(prevButtonClass => !prevButtonClass);
    }

    return(
        <div>
            <p className= {styles.text} >{labelText}</p>
                <span className={styles.SpanContainer}>
                    <input type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly = {readOnly}></input>
                    {showButton ?    
                        <button onClick={(event) => buttonHandler(event)} type="button" className={buttonClass ? styles.MeuButton : styles.MeuButtonClick} >
                            <img src='src/assets/Editar.png'/>
                        </button>
                        :null
                    }
                </span>
        </div>
    )
}