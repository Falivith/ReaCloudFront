import React, { useState } from "react";
import styles from "./RemoveReaModal.module.css";
import Warningsymbol from "../../assets/WarningSymbol.png";
import {sendReaIssue} from "../../services/reaquerys";

const InformarProblemaModal = (props) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleSubmitIssue() {
    console.log("Input Value:", inputValue);
    console.log("ID:", props.id);
    try {
        let sent = await sendReaIssue(props.id, inputValue);
        if (sent.status === 201) {
        console.log("Problema enviado com sucesso.");
        props.onSubmit(true);
        props.callModal();
        }
    } catch(error) {
        console.log("Erro ao fazer o envio do problema.");
        props.onSubmit(false);
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.modalContainer}>
        <header className={styles.header}>
          <img src={Warningsymbol} alt="Figura de problema" className={styles.warningImage}/>
          <h1>Informar um problema</h1>
        </header>
        <div className={styles.textContainer}>
          <p className={styles.text}>Por favor, informe qual o problema com o recurso.</p>
          <textarea
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite aqui..."
            className={styles.input}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.submitButton} onClick={props.callModal}>
            CANCELAR
          </button>
          <button
            onClick={() => handleSubmitIssue()}
            className={styles.cancelButton}
          >
            ENVIAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformarProblemaModal;
