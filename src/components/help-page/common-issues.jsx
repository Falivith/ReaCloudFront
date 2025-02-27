import styles from "./faq.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function CommonIssues() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.titleContainer}
        onClick={toggleContent}
        style={{ cursor: "pointer" }}
      >
        <h1 className={styles.reaTitle}>
          <FontAwesomeIcon
            icon={faCircleRight}
            style={{ marginRight: "5px", color: "var(--green)" }}
          />
          Problemas Comuns
        </h1>
      </div>
      <div className={`${styles.FaqContent} ${isOpen ? styles.open : ""}`}>
        <div>
          <h2>O site não está carregando. O que devo fazer?</h2>
          <p>
            Verifique sua conexão com a internet. Se o problema persistir, tente
            limpar o cache do seu navegador ou acessar o site em um navegador
            diferente. Se ainda assim não funcionar, {" "}
            <a
              href="mailto:reacloudplatform@gmail.com"
              className={styles.emailLink}
            >
              entre em contato conosco.
            </a>
          </p>
          <h2>
            Encontrei um recurso que não está funcionando. O que devo fazer?
          </h2>
          <p>
            Por favor, nos informe sobre o recurso problemático usando o link
            "Reportar Problema" na página do recurso. Iremos verificar e
            corrigir o problema o mais rápido possível.
          </p>
        </div>
      </div>
    </div>
  );
}
