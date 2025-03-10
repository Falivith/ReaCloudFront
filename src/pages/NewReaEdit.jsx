import { Header } from "../components/Header"
import { Help } from "../components/Help"
import { ReaInputForm } from "../components/reaconfig/ReaInputForm"

export function NewReaEdit(){
    return(
        <div>
            <Header />
            <ReaInputForm/>
            <Help/>
        </div>
    )
}
