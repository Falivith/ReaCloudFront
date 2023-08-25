import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';
import Loading from '../loading';

export function ReaList({ filterData, onFilterChange, isLoading }) {

    return (
        <div className={styles.reaContainer}>
            {isLoading ? <Loading /> :
            
            filterData && filterData.map(rea => {
                
                let uint8Array = new Uint8Array(rea.thumb);
                let blob = new Blob([uint8Array], { type: "Buffer" });
                let url = URL.createObjectURL(blob);

                if (rea.thumb) {
                    uint8Array = new Uint8Array(rea.thumb.data);
                    blob = new Blob([uint8Array], { type: "Buffer" });
                    url = URL.createObjectURL(blob);
                }

                return <ReaPreview
                    key={rea.id}
                    id={rea.id}
                    title={rea.title}
                    link={rea.link}
                    description={rea.description}
                    likes={rea.likes}
                    thumb={url}
                />;
            })}
        </div>
    );
}
