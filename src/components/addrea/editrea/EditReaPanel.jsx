import EditGear from "../../../assets/Gear.png";
import { PostedResourceContainer } from "./PostedResourceContainer";
import styles from "./EditReaPanel.module.css";
import { useNavigate } from 'react-router-dom';
import { RemoveReaModal } from '../../modals/RemoveReaModal'
import { useState } from "react";

// const reas = [
//     {
//         id: 1,
//         title: "Histórico dos Recursos Educacionais Abertos no Brasil e no Mundo",
//     },
//     {
//         id: 2,
//         title: "Escolas, universidades, ONGs, governos, etc.",
//     },
//     {
//         id: 3,
//         title: "Licenças de direito autoral e Creative Commons, formatos abertos e formatos fechados",
//     }
// ];

export function EditReaPanel({reas}){

    const [modalOpen, open] = useState(false)

    const callModal = () => {
        open(!modalOpen);
    }

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return(
        <div className = { styles.container }>
            <div className = { styles.header }>
                <div className = { styles.addNewReasLabel }>
                    <img src = { EditGear } alt = "Editar seus Recursos" />
                    <h1>Edite seus recursos</h1>                    
                </div>
                <span>Você tem <span className = { styles.pluginReaCounter }>2</span> recursos cadastrados. </span>
            </div>
            <div className = { styles.pluginRequester }>
                {reas && reas.map(rea => {
                    return <PostedResourceContainer
                        key = {rea.id}
                        title = {rea.title}
                    />
                    })
                }
            </div>
        </div>
        /*{}*/
    )
}
