import React from 'react'

import styles from './Drag.scss'
import { Icon } from 'antd'

const Drag = () => {
    return (
        <div className={styles.component}>
            <Icon type="drag" className={styles.dragIcon} />
        </div>
    )
}

export default Drag
