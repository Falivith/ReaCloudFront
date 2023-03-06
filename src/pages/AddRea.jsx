import { Header } from '../components/Header';
import { AddReaPanel } from '../components/addrea/AddReaPanel';

export function AddRea() {
    return (
        <div>
            <Header showAddRecurso = {false} isLogged = {true}/>
            <AddReaPanel/>       
        </div>
    )
}
