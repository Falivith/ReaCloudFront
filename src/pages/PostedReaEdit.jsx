import { Header } from "../components/Header"
import { ReaInputForm } from "../components/reaconfig/ReaEditInputForm"

export function PostedReaEdit(){
    return(
        <div>
            <Header showAddRecurso = {false} isLogged = {true}/>
            <ReaInputForm/>
        </div>
    )
}
