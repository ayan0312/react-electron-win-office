import React from 'react'

import styles from './Square.scss'

interface IProps {
    zIndex?: number
}

const Square = (props: IProps) => {
    const { zIndex = 1 } = props
    return (
        <div className={styles.component} style={{ zIndex }}>
            <i className={styles.before}></i>
            <i className={styles.after}></i>
        </div>
    )
}

export default Square
