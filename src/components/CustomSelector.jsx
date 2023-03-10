import styles from "./CustomSelector.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Polygon from "../assets/Polygon.png";

export function CustomSelector(props){

  const ref = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => {
    setIsOpen(!isOpen);
    //console.log("Aberto: " + !isOpen)
  }

  const [selectedOption, setSelectedOption] = useState('Todos');

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  // Estilo via props

  const divStyle = {
    width: props.width,
    height: props.height
  };

  console.log("Props: ")
  console.log(props)
  console.log("Recebido: ")
  console.log(divStyle)

  const options = props.options

  console.log(options)

  // Fechar ao clicar fora do container

  useEffect(() => {
    const closeDropDown = e => {
      if(!e.composedPath()[0].className.includes("dropDownHeader") && !e.composedPath()[0].className.includes("arrow")){
        setIsOpen(false); 
      }
    }
    document.body.addEventListener('click', closeDropDown)
    return () => document.body.removeEventListener('click', closeDropDown); 
  }), [];

  return(
    <div className = { styles.dropDownContainer } 
      style = {{ 
      width: props.width,
      height: props.height
      }}>
      <div onClick = { toggling } className = { (isOpen ? styles.dropDownHeader : styles.dropDownHeaderClosed )} 
      style = {{ 
      width: props.width,
      height: props.height
      }}>
        {selectedOption || "Todas"}
          <img className = { styles.arrow } src = { Polygon }/>
      </div>
      {isOpen && (
      <div className = { styles.dropDownListContainer + (isOpen ? '' : 'closed') }>
        <ul className = { styles.dropDownList } 
          style = {{ 
            width: props.width
          }}>
          {options.map(option => (
            <li className = { styles.listItem } onClick = { onOptionClicked(option) } key = {Math.random()}>
                {option} 
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  )
}
