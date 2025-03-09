import { EditReaPanel } from '../components/addrea/editrea/EditReaPanel';
import { Header } from '../components/Header';
import { useState, useEffect } from 'react';
import { getUserResources } from '../services/reaquerys';
import { Help } from '../components/Help';

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
            <Header />
            <EditReaPanel reas = {userResources} isLoading = {isLoading}/>
            <Help/>
        </div>
    )
}
