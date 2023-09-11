import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import styles from './SuperSelector.module.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";  

export function SuperSelector() {

    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const customStyle = {
        minWidth: '350px', // Change the value to your desired width
      };

    return (
        <div className="card flex justify-content-center">
            <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
                filter placeholder="Todas" maxSelectedLabels={3} className = { styles.selector }  style={customStyle}/>
        </div>
    );
}