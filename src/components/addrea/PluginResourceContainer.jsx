import styles from "./PluginResourceContainer.module.css";

export function PluginResourceContainer(props){
    return(
        <div className = { styles.container }>
            <h1>
               { props.title }
            </h1>
            <button>
                Adicionar
            </button>
        </div>
    )
}

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

export function ReaList() {
    return (
        <div className = { styles.reaContainer }>
            {reas.map(rea => {
                return <ReaPreview
                    key = {rea.id}
                    title = {rea.title}
                />
                })
            }
        </div>
    )
}
