import styles from "./CustomSelector.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Polygon from "../assets/Polygon.png";

export function CustomSelector(props){

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => {
    setIsOpen(!isOpen);
  }

  const [selectedOption, setSelectedOption] = useState('Todos');

  const onOptionClicked = value => () => {
    setSelectedOption(value);

    if(props.handleResult) // Se o parâmetro foi passado
    props.handleResult(props.id, value)

    setIsOpen(false);
  };

  const options = props.options
  const id = props.selectorId

  // Fechar ao clicar fora do container

  useEffect(() => {
    const closeDropDown = e => {
      if(!(e.composedPath()[1].id == id || e.composedPath()[0].id == id)){
        setIsOpen(false);
      }
    }
    document.body.addEventListener('click', closeDropDown)
    return () => document.body.removeEventListener('click', closeDropDown); 
  }), [];

  return(
    <div className = { styles.dropDownContainer } id = { props.selectorId } /*onClick = { () => { console.log("click", props.id) } }*/
        style = {{ 
        width: props.width,
        height: props.height
      }}>
      <div onClick = { toggling } className = { (isOpen ? styles.dropDownHeader : styles.dropDownHeaderClosed )} 
        style = {{ 
        width: props.width,
        height: props.height,
        color: props.color,
        fontSize: props.fontSize
      }}>
        {selectedOption || "Todas"}
          <img className = { styles.arrow } src = { Polygon } id = { props.selectorId }/>
      </div>
      {isOpen && (
      <div className = { styles.dropDownListContainer + (isOpen ? '' : 'closed') }>
        <ul className = { styles.dropDownList } 
          style = {{ 
            width: props.width
          }}>
          {options.map((option, index) => {
            return (
            <li className = { styles.listItem } onClick = { onOptionClicked( option ) } key = { index } /*key = {Math.random() }*/ >
                {option} 
            </li>
          )})}
        </ul>
      </div>
      )}
    </div>
  )
}
