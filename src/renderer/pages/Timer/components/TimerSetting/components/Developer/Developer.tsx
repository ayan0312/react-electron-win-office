import React from 'react'

import styles from './Developer.scss'

interface IProps {}

export default class Developer extends React.Component<IProps> {
    render() {
        return (
            <div className={styles.component}>
                <h4>开发者</h4>
            </div>
        )
    }
}
