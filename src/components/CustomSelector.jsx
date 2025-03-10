import styles from "./CustomSelector.module.scss";
import React, { useEffect, useState } from "react";
import Polygon from "../assets/Polygon.png";

export function CustomSelector(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => {
    setIsOpen(!isOpen);
  };

  const [selectedOption, setSelectedOption] = useState(
    props.placeholder || props.initialValue
  );

  const onOptionClicked = (choosedOption) => () => {
    setSelectedOption(choosedOption);

    if (choosedOption == "Todos") {
      choosedOption = "";
    }

    if (props.handleResult) props.handleResult(props.id, choosedOption);

    setIsOpen(false);
  };

  let options = props.options;
  const id = props.selectorId;

  if (props.type == "filter" && options[0] != "Todos") {
    options.unshift("Todos");
  }

  // Fechar ao clicar fora do container

  useEffect(() => {
    const closeDropDown = (e) => {
      const clickedInside = document.getElementById(id)?.contains(e.target);
      if (!clickedInside) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, [id]);

  return (
    <div
      className={styles.dropDownContainer}
      id={props.selectorId}
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <div
        onClick={toggling}
        className={isOpen ? styles.dropDownHeader : styles.dropDownHeaderClosed}
        style={{
          width: props.width,
          height: props.height,
          color: props.color,
          fontSize: props.fontSize,
        }}
      >
        <span className={styles.selectedOption}>
          {selectedOption || "Todos"}
        </span>
        <img className={styles.arrow} src={Polygon} id={props.selectorId} />
      </div>
      {isOpen && (
        <div
          className={styles.dropDownListContainer + (isOpen ? "" : "closed")}
        >
          <ul
            className={styles.dropDownList}
            style={{
              width: props.width,
            }}
          >
            {options.map((option, index) => {
              return (
                <li
                  className={styles.listItem}
                  onClick={onOptionClicked(option)}
                  key={index} /*key = {Math.random() }*/
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
