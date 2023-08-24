import { EditReaPanel } from '../components/addrea/editrea/EditReaPanel';
import { Header } from '../components/Header';
import { useState, useEffect } from 'react';
import { getUserResources } from '../services/reaquerys';

export function EditPostedReas(){
    const [userResources, setUserResources] = useState([]);
    useEffect(() => {
      async function fetchUserResources() {
        const resources = await getUserResources();
        setUserResources(resources);
        console.log(resources);
      }
  
      fetchUserResources();
    }, []);


    return(

        <div>
            <Header />
            <EditReaPanel reas = {userResources}/>
        </div>
    )
}