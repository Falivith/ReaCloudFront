import styles from "./faq.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function StepByStepGuides() {
  const [isOpen, setIsOpen] = useState(false);

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
          Guias Passo-a-Passo
        </h1>
      </div>
      <div className={`${styles.FaqContent} ${isOpen ? styles.open : ""}`}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quam architecto ipsum autem recusandae optio, illo minima! Odit qui
          quidem iusto? Id, et alias possimus quasi nihil sint vitae doloribus!
        </p>
      </div>
    </div>
  );
}
