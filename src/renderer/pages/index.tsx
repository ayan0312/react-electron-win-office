import React from 'react';
import styles from './index.scss';

import Timer from './Timer/Timer';

import Square from '../components/Square/Square';
import TitleBar from '../components/TitleBar/TitleBar';
import Drag from '../components/Drag/Drag';

export default () => {
    return (
        <div className={styles.component}>
            <TitleBar />
            <Timer />
            <Drag />
            <Square zIndex={19} />
        </div>
    );
};
