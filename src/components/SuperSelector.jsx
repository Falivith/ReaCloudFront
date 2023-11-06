import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import styles from './SuperSelector.module.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";

export function SuperSelector(props) {

    const customStyle = {
        //minWidth: '350px',
    };

    return (
        <div className = { styles.multiSelectContainer }>
            <MultiSelect
                value={props.selectedOptions}
                onChange={(e) => props.setState(e.value)}
                options={props.options}
                optionLabel="name" 
                filter
                placeholder="Todas"
                maxSelectedLabels={3}
                className={styles.selector}
                style={customStyle}
                display="chip"
                panelStyle={{ width: '200px' }}
            />
        </div>
    );
}
