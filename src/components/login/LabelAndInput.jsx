import styles from './LabelAndInput.module.css'


export function LabelAndInput({labelText, inputType, placeholderText,inputStyle = styles.input, value,onChange,name}) {
    return(
        <div>
            <p className= {styles.text} >{labelText}</p>
            <input 
            type = {inputType}
            className={inputStyle} 
            placeholder={placeholderText}
            value = {value}
            onChange = {onChange}
            name = {name}>

            </input>
        </div>
    )
}