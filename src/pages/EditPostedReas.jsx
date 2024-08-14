import { EditReaPanel } from '../components/addrea/editrea/EditReaPanel';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { getUserResources } from '../services/reaquerys';

export function EditPostedReas(){

    const [ userResources, setUserResources] = useState([]);
    const [ isLoading, setIsLoading ] = useState (true);

    useEffect(() => {
      
      async function fetchUserResources() {
        const resources = await getUserResources();
        setUserResources(resources);
        setIsLoading(false)
      }
  
      fetchUserResources();
    }, []);

    return(
        <div>
            <Navbar />
            <EditReaPanel reas = {userResources} isLoading = {isLoading}/>
        </div>
    )
}
