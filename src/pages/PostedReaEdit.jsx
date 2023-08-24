import { Header } from "../components/Header"
import { ReaInputForm } from "../components/reaconfig/ReaEditInputForm"
import { useLocation } from 'react-router-dom';




export function PostedReaEdit(){
    const location = useLocation(); // Get the location object
    const { state } = location;
    const id = state?.id;

    console.log("id = ", id);


    return(
        <div>
            <Header />
            <ReaInputForm/>
        </div>
    )
}
