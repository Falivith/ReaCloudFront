import { PluginReasPanel } from '../components/addrea/PluginReasPanel';
import { Header } from '../components/Header';

export function PluginReas(){
    return(
        <div>
            <Header showAddRecurso = {false} isLogged = {true}/>
            <PluginReasPanel/>
        </div>
    )
}
