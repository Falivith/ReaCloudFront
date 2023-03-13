import { Header } from "../components/Header"
import { ReaInputForm } from "../components/reaconfig/ReaInputForm"

export function NewReaEdit(){
    return(
        <div>
            <Header showAddRecurso = {false} isLogged = {true}/>
            <ReaInputForm/>
        </div>
    )
}
