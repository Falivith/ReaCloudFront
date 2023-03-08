import styles from "./PluginResourceContainer.module.css";

export function PluginResourceContainer(props){
    return(
        <div className = { styles.container }>
            <h1>{ props.title }</h1>
            <button>ADICIONAR</button>
        </div>
    )
}
