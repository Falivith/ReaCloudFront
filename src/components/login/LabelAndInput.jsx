import styles from './LabelAndInput.module.css'


export function LabelAndInput({labelText, inputType, placeholderText,inputStyle = styles.input}) {

    return(
        <div>
            <p className= {styles.text} >{labelText}</p>
            <input type = {inputType}className={inputStyle} placeholder={placeholderText}></input>
        </div>
    )
}