import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';
import Loading from '../Loading';

export function ReaList({ filterData, onFilterChange, isLoading }) {

    return (
        <div className={styles.reaContainer}>
            {isLoading ? <Loading /> :
                filterData && filterData.map((rea, index) => {

                    let uint8Array = new Uint8Array(rea.thumb);
                    let blob = new Blob([uint8Array], { type: "Buffer" });
                    let url = URL.createObjectURL(blob);

                    if (rea.thumb) {
                        uint8Array = new Uint8Array(rea.thumb.data);
                        blob = new Blob([uint8Array], { type: "Buffer" });
                        url = URL.createObjectURL(blob);
                    }

                    const springProps = useSpring({
                        opacity: 1,
                        transform: 'translateY(0)',
                        from: { opacity: 0, transform: 'translateY(20px)' },
                        delay: index * 150,
                        config: config.gentle,
                        width: '100%',
                    });

                    return (
                        <animated.div style={springProps} key={rea.id}>
                            <ReaPreview
                                id={rea.id}
                                title={rea.title}
                                link={rea.link}
                                description={rea.description}
                                likes={rea.likes}
                                thumb={url}
                            />
                        </animated.div>
                    );
                })
            }
        </div>
    );
}