import EditGear from "../../../assets/Gear.png";
import { PostedResourceContainer } from "./PostedResourceContainer";
import styles from "./EditReaPanel.module.css";
import { useNavigate } from 'react-router-dom';

const reas = [
    {
        id: 1,
        title: "Histórico dos Recursos Educacionais Abertos no Brasil e no Mundo",
    },
    {
        id: 2,
        title: "Escolas, universidades, ONGs, governos, etc.",
    },
    {
        id: 3,
        title: "Licenças de direito autoral e Creative Commons, formatos abertos e formatos fechados",
    }
];

export function EditReaPanel(){

    const navigate = useNavigate();
    const routeChangeHandler = (route) => {
        navigate(`../${route}`);
    }

    return(
        <div className = { styles.container }>
            <div className = { styles.header }>
                <div className = { styles.addNewReasLabel }>
                    <img src = { EditGear } alt = "Adicionar novos recursos" />
                    <h1>Adicionar novos recursos</h1>                    
                </div>
                <span>Você tem <span className = { styles.pluginReaCounter }>2</span> recursos salvos que ainda não foram adicionados.</span>
            </div>
            <div className = { styles.pluginRequester }>
                {reas.map(rea => {
                    return <PostedResourceContainer
                        key = {rea.id}
                        title = {rea.title}
                    />
                    })
                }
            </div>
        </div>
    )
}
