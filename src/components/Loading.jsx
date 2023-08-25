import React from "react";
import styles from "./Loading.module.css";

export default function Loading(props) {
  return (
    <div className = { props.editReas ? styles.spinnerContainerEdit : styles.spinnerContainer }>
      <div className = { props.editReas ? styles.spinnerEdit : styles.spinner }>
      </div>
    </div>
  );
}
