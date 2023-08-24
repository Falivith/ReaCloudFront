import { Header } from '../components/Header';
import { ReaPanel } from '../components/reaview/ReaPanel';
import { Suggestions } from '../components/reaview/Suggestions';
import { CommentSection } from '../components/reaview/CommentSection';
import styles from '../App.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getResourceInfo } from '../services/reaquerys';

export function ReaView() {

  const { id } = useParams(); // Get the id from the URL parameter
  useEffect(() => {
    const fetchResourceInfo = async () => {
        try {
            const result = await getResourceInfo(id);
            console.log(result);
        } catch (error) {
            console.error('Failed to fetch resource info', error);
        }
    };

    fetchResourceInfo();
}, [id]); // Dependency array. If the id changes, the effect runs again.


    return(
      <div>
          <Header/>
          <div className = { styles.reaViewContainer }>
            <div>
            <ReaPanel/>
            <CommentSection/>
            </div>
            <Suggestions/>
          </div>
      </div>
    )
}
