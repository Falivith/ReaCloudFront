import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { MeuEmailESenha } from '../components/profile/MeuEmailESenha'

export function MeuPerfil() {
    return (
        <div>
            <Header showAddRecurso={false} isLogged={true} notificationNumber = {4}/> 
            <MeusDados />
            <MeuEmailESenha />
            <Help/>
        </div>
    )
}
