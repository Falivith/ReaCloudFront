import styles from "./Recover.module.css";
import { Header } from "../Header";
import { LabelAndInput } from "./LabelAndInput";
import { Button } from "./Button";
import React, { useState } from "react";

//  TODO: A recuperação de senha também será implementada após a implementação do cadastro pela plataforma.

export function Recover() {
  const [typePassword, setTypePassword] = useState(false);

  const buttonHandler = (event) => {
    event.preventDefault();
    setTypePassword(true);
  };

  const form1 = (
    <form>
      <LabelAndInput
        labelText={"E-MAIL"}
        inputType={"email"}
        placeholderText={"exemplo@email.com"}
      />
      <div className={styles.marginDiv}>
        <Button
          handler={buttonHandler}
          textButton={"ENVIAR"}
          class2={styles.spanText2}
        />
      </div>
    </form>
  );

  const form2 = (
    <form>
      <LabelAndInput
        labelText={"NOVA SENHA"}
        inputType={"password"}
        placeholderText={"• • • • • • •"}
      />
      <LabelAndInput
        labelText={"REPITA SUA NOVA SENHA"}
        inputType={"password"}
        placeholderText={"• • • • • • •"}
      />

      <div className={styles.marginDiv}>
        <Button
          handler={buttonHandler}
          textButton={"ENVIAR"}
          class2={styles.spanText2}
        />
      </div>
    </form>
  );

  const descriptionText = () => {
    return !typePassword ? (
      <p className={styles.normalText}>
        Informe o e-mail utilizado na criação da sua conta e enviaremos
        instruções para redefinir a sua senha!
      </p>
    ) : (
      <p className={styles.normalText2}>
        Escolha uma nova senha para a sua conta
      </p>
    );
  };

  return (
    <div>
      {" "}
      <Header />
      <div className={styles.container}>
        <p className={styles.titleText}>Redefinição de senha</p>
        <br></br>
        {/* <p className={styles.normalText}>
                    {!typePassword ?
                    "Informe o e-mail utilizado na criação da sua conta e enviaremos instruções para redefinir a sua senha!"
                    :
                    "Escolha uma nova senha para a sua conta"   
                    }
                </p> */}
        {descriptionText()}
        {!typePassword ? form1 : form2}
      </div>
    </div>
  );
}
