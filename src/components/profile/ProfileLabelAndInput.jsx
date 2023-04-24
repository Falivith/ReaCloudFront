import styles from './Profile.module.css'
import '../../global.css'
import { useState } from 'react';
import Editar from "/Editar.png"
export function ProfileLabelAndInput({labelText, inputType, showButton = true, placeholderText,inputStyle = styles.input, value,onChange,name}) {
    
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
                        <input name = {name} onChange = {onChange} value = {value}type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly = {readOnly}></input>
                        <button onClick={(event) => buttonHandler(event)} type="button" className={buttonClass ? styles.MeuButton : styles.MeuButtonClick} >
                            <img src={Editar}/>
                        </button>
                        </>
                        :
                        <input name = {name} onChange = {onChange} value = {value} type ={inputType} className={inputStyle} placeholder={placeholderText} readOnly = {false}></input>
                    }
                </span>
        </div>
    )
}