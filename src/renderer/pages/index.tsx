import React from 'react';
import styles from './index.scss';

import Timer from './Timer/Timer';

import Square from '../components/Square/Square';
import TitleBar from '../components/TitleBar/TitleBar';

export default () => {
    return (
        <div className={styles.component}>
            <TitleBar />
            <Timer />
            <Square zIndex={19} />
        </div>
    );
};
