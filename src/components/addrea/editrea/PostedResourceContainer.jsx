import styles from "./PostedResourceContainer.module.css";
import { useNavigate } from "react-router-dom";
import CloseSymbol from '../../../assets/CloseX.png';
import { useState } from "react";
import RemoveReaModal from '../../modals/RemoveReaModal';

export function PostedResourceContainer(props) {
    const [modalOpen, open] = useState(false);

    const callModal = () => {
        open(!modalOpen);
    }

    const id = props?.id;

    const navigate = useNavigate();

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className={styles.container} id={id}>
            <div className={styles.h1container}>
                <h1>{props.title}</h1>
            </div>
            <div>
                <button onClick={() => navigate(`/postedreaedit/${id}`, { state: { id } })}> EDITAR </button>                <img src={CloseSymbol} alt="Figura de remoção" className={styles.close} onClick={callModal} />
            </div>
            {modalOpen && <RemoveReaModal  callModal={callModal} title={props.title} id={id} refreshPage={refreshPage} />}
        </div>
    );
}
