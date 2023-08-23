import styles from './MainPageContainer.module.css';
import { Filters } from '../Filters';
import { useState } from 'react';
import { Welcome } from './Welcome';
import { Art } from './Art';

export function MainPageContainer (){
    
  

    return(
        <div className = { styles.container }>
            <Welcome/>
            <Filters/>
            <Art/>
        </div>
    );
}
