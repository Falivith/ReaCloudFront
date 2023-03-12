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
                    
                    {showButton ?    
                        <>
                        <input type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly = {readOnly}></input>
                        <button onClick={(event) => buttonHandler(event)} type="button" className={buttonClass ? styles.MeuButton : styles.MeuButtonClick} >
                            <img src='src/assets/Editar.png'/>
                        </button>
                        </>
                        :<input type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly = {false}></input>
                    }
                </span>
        </div>
    )
}