import React from 'react';

import styles from './Drag.scss';
import { Icon } from 'antd';

const Drag = () => {
    return (
        <div className={styles.component}>
            <Icon type="drag" style={{ fontSize: '30px', color: '#585858' }} />
        </div>
    );
};

export default Drag;
