import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';
import Loading from '../Loading';
import { backURL } from "../../services/utils";

export function ReaList({ filterData, isLoading }) {

    const getFullThumbURL = (thumbPath) => `${backURL}/${thumbPath}`;

    return (
        <div className={styles.reaContainer}>
            {isLoading ? <Loading /> :
                filterData && filterData.map((rea, index) => {

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
                                likes={rea.numLikes}
                                thumb={getFullThumbURL(rea.thumb)}
                            />
                        </animated.div>
                    );
                })
            }
        </div>
    );
}