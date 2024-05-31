import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ReaPanel } from '../components/reaview/ReaPanel';
import { CommentSection } from '../components/reaview/CommentSection';
//import { Suggestions } from '../components/reaview/Suggestions';
import styles from '../App.module.css';
import { getResourceInfo } from '../services/reaquerys';
import Loading from '../components/Loading';

export function ReaView() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rea, setRea] = useState(null);
  
  useEffect(() => {
    const fetchResourceInfo = async () => {
      try {
        const result = await getResourceInfo(id);
        setRea(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch resource info', error);
        setIsLoading(false);
      }
    };

    fetchResourceInfo();
  }, [id]);

  return (
    <div>
      <Header />
      <div className={styles.reaViewContainer}>
        <div className={styles.reaViewContent}>
          {isLoading ? (
            <Loading/>
          ) : (
            <>
              <ReaPanel 
                rea={rea} 
                isLoading={isLoading} 
              />
              <CommentSection resourceId={id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
