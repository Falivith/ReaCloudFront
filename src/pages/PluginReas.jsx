import { PluginReasPanel } from '../components/addrea/PluginReasPanel';
import { Header } from '../components/Header';
import { Help } from '../components/Help';

export function PluginReas(){
    return(
        <div>
            <Header />
            <PluginReasPanel/>
            <Help/>
        </div>
    )
}
