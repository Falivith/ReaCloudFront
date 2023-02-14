import styles from './FormLogin.module.css'


export function LabelAndInput({labelText, inputType, placeholderText}) {

    return(
        <div>
            <p className= {styles.text} >{labelText}</p>
            <input type = {inputType}className={styles.input} placeholder={placeholderText}></input>
        </div>
    )
}