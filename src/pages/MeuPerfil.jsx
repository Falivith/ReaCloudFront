import '../global.css';
import { Header } from '../components/Header';
import { Help } from '../components/Help';

export function MeuPerfil() {
    return (
        <div>
            <Header showAddRecurso={false} isLogged={true} notificationNumber = {4}/> 
            <Help/>
        </div>
    )
}
