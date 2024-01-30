import styles from './BaseNotification.module.css'
import WarningSymbol from '../../assets/WarningSymbol.png'
import CheckSymbol from '../../assets/CheckSymbol.png'
import DangerSymbol from '../../assets/DangerSymbol.png'
import CloseSymbol from '../../assets/CloseX.png'

export function BaseNotification(props){

    const close = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    let notificationProps

    switch(props.type){
        case 'savePerfilSuccess':
            notificationProps = {
                img: CheckSymbol, 
                title: "Dados salvos com sucesso!",
                description: "Seu perfil foi atualizado.",
                backgroundcolor: "#22BB55",
                textcolor: "#22BB55"
            }
        break;

        case 'saveReaSuccess':
            notificationProps = {
                img: CheckSymbol, 
                title: "Dados salvos com sucesso!",
                description: "Seu recurso foi salvo.",
                backgroundcolor: "#22BB55",
                textcolor: "#22BB55"
            }
        break;

        case 'saveReaError':
            notificationProps = {
                img: DangerSymbol,
                title: "Erro ao criar o recurso.",
                description: "Por favor, tente novamente. Lembre-se que todos os campos, incluindo a imagem do recurso são obrigatórios.",
                backgroundcolor: "#D30000",
                textcolor: "#D30000"
            }
        break;

        case 'saveError':
            notificationProps = {
                img: DangerSymbol,
                title: "Erro ao salvar os dados",
                description: "Por favor, tente novamente.",
                backgroundcolor: "#D30000",
                textcolor: "#D30000"
            }
        break;

        case 'saveErrorLogin':
            notificationProps = {
                img: DangerSymbol,
                title: "Erro ao salvar os dados",
                description: "Nome ou email inválidos!",
                backgroundcolor: "#D30000",
                textcolor: "#D30000"
            }
        break;

        case 'saveReaErrorUnloged':
            notificationProps = {
                img: WarningSymbol,
                title: "Você não está logado.",
                description: "Faça login no ReaCloud para poder adicionar seus Recursos.",
                backgroundcolor: "#EE7700",
                textcolor: "#EE7700"
            }
        break;

        case 'signupError':
            notificationProps = {
                img: DangerSymbol,
                title: "Erro ao cadastrar usuário.",
                description: "Verifique a sua conexão e tente novamente.",
                backgroundcolor: "#D30000",
                textcolor: "#D30000"
            }
        break;

        case 'loginError':
            notificationProps = {
                img: DangerSymbol,
                title: "Erro ao fazer login.",
                description: "Verifique a sua conexão e tente novamente.",
                backgroundcolor: "#D30000",
                textcolor: "#D30000"
            }
        break;

        case 'passwordSuccess':
            notificationProps = {
                img: CheckSymbol,
                title: "Senha alterada com sucesso!",
                description: "Sua senha foi atualizada.",
                backgroundcolor: "#22BB55",
                textcolor: "#22BB55"
            }
        break;

        case 'passwordWarning':
            notificationProps = {
                img: WarningSymbol,
                title: "A senha escolhida não é segura.",
                description: "Atente-se aos requisitos para escolher uma senha mais forte.",
                backgroundcolor: "#EE7700",
                textcolor: "#EE7700"
            }
        break;

        case 'passwordError':
            notificationProps = {
                img: DangerSymbol, 
                title: "Erro ao alterar senha.",
                description: "Por favor, tente novamente.",
                backgroundcolor: "#D30000",
                textcolor: "#D30000"
            }
        break;

        default:
            notificationProps = {
                img: WarningSymbol,
                title: "Notificação Indefinida",
                description: "Envie alguma propriedade de notificação, dev!",
                backgroundcolor: "#22BB55",
                textcolor: "#22BB55"
            }
    }

    return props.showing ? (
        <div className = { styles.backgroundColorAndContainer } style = {{ backgroundColor: notificationProps.backgroundcolor }}>
            <div className = { styles.background }>
                <header className = { styles.header }>
                    <div>
                        <img src = { notificationProps.img }/>
                        <h1 className = { styles.title } style = {{ color: notificationProps.textcolor }} > { notificationProps.title } </h1>
                    </div>
                    <img onClick = { close } src = { CloseSymbol } alt = "Fechar" className = { styles.close }/>
                </header>
                    <p className = { styles.description }> { notificationProps.description } </p>
            </div>
        </div>
    ) : null;
}
