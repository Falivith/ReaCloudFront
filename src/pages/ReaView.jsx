import { Header } from '../components/Header';
import { ReaPanel } from '../components/reaview/ReaPanel';
import { Suggestions } from '../components/reaview/Suggestions';
import { CommentSection } from '../components/reaview/CommentSection';
import styles from '../App.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getResourceInfo } from '../services/reaquerys';

export function ReaView() {

  const { id } = useParams(); // Get the id from the URL parameter
  const [ isLoading, setIsLoading ] = useState(true); // Initialize isLoading with true
  const [ rea, setRea ] = useState(null)
  
  useEffect(() => {
    const fetchResourceInfo = async () => {
      try {
        const result = await getResourceInfo(id);
        setRea(result)
        setIsLoading(false); // Set isLoading to false after fetching data
      } catch (error) {
        console.error('Failed to fetch resource info', error);
        setIsLoading(false); // Also set isLoading to false in case of an error
      }
    };

    fetchResourceInfo();
  }, [id]);

  return (
    <div>
      <Header />
      <div className={styles.reaViewContainer}>
        <div className={styles.reaViewContent}>
          <ReaPanel 
            rea = {rea} 
            isLoading = {isLoading} />
          <CommentSection resourceId = {id}/>
        </div>
        <Suggestions />
      </div>
    </div>
  );
}
