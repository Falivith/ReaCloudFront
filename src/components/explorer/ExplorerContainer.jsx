import styles from './ExplorerContainer.module.css';
import { ReaCloudStaticLogo } from '../ReaCloudStaticLogo';

export function ExplorerContainer (){
    return(
        <div className = { styles.container }>
            <ReaCloudStaticLogo/>
        </div>
    );
}