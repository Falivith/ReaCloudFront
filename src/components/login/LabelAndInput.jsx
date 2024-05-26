import styles from "./LabelAndInput.module.css";

export function LabelAndInput({
  labelText,
  inputType,
  placeholderText,
  inputStyle = styles.input,
  value,
  onChange,
  name,
  disabled,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{labelText}</p>
      <input
        type={inputType}
        className={inputStyle}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      ></input>
    </div>
  );
}
