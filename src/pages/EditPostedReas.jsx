import { EditReaPanel } from '../components/addrea/editrea/EditReaPanel';
import { Header } from '../components/Header';

export function EditPostedReas(){
    return(

        <div>
            <Header showAddRecurso = {false} isLogged = {true}/>
            <EditReaPanel/>
        </div>
    )
}