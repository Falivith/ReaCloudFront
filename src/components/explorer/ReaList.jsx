import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';
import { getAllReas } from '../../services/reaquerys';
import { useState, useEffect } from 'react';

export function ReaList() {
    
    const [reas, setReas] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result = await getAllReas();
          setReas(result);
        }
        fetchData();
      }, []);

    return (
        <div className = { styles.reaContainer }>
            {reas.map(rea => {
                
                let uint8Array = new Uint8Array(rea.thumb);
                let blob = new Blob([uint8Array], { type: "Buffer" });
                let url = URL.createObjectURL(blob);

                if(rea.thumb){
                    uint8Array = new Uint8Array(rea.thumb.data)
                    blob = new Blob([uint8Array], { type: "Buffer" });
                    url = URL.createObjectURL(blob);
                }
                console.log(rea)

                return <ReaPreview
                    id = {rea.id}
                    title = {rea.title}
                    description = {rea.description}
                    likes = {rea.likes}
                    thumb = {url}
                />
                })
            }
        </div>
    )
}
