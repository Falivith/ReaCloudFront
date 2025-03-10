import styles from "./faq.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function Faq() {
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
          FAQ
        </h1>
        <p className={styles.reaTitleDesk}>- Perguntas frequentes</p>
      </div>
      <div className={`${styles.FaqContent} ${isOpen ? styles.open : ""}`}>
        <div>
          <h2>O que é o ReaCloud?</h2>
          <p>
            O ReaCloud é um indexador de recursos educacionais abertos, projetado
            para ajudar estudantes, educadores e pesquisadores a encontrar
            materiais de aprendizagem gratuitos e de alta qualidade.
          </p>
          <h2>Como posso usar o ReaCloud?</h2>
          <p>
            Você pode usar o ReaCloud para buscar recursos educacionais digitando
            o nome do recurso na barra de pesquisa, e também filtrando de acordo
            com sua área de conhecimento ou tipo de material de acordo com a BNCC.
          </p>
          <h2>O que são recursos educacionais abertos (REA)?</h2>
          <p>
            Recursos educacionais abertos são materiais de ensino, aprendizado e
            pesquisa que estão disponíveis gratuitamente para uso, adaptação e
            compartilhamento. Eles podem incluir livros didáticos, cursos online,
            vídeos, artigos e muito mais.
          </p>
          <h2>Posso contribuir com recursos para o ReaCloud?</h2>
          <p>
          Sim! Se você conhece um recurso educacional aberto que acha que seria útil 
          para outros usuários, você pode enviá-lo clicando no botão "Adicionar Recurso". 
          Lembre-se que para enviar um recurso, é preciso estar logado!
          </p>
        </div>
      </div>
    </div>
  );
}
