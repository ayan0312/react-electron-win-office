import React from 'react'

import styles from './Sponsor.scss'

interface IProps {}

export default class Sponsor extends React.Component<IProps> {
    render() {
        return (
            <div className={styles.component}>
                <h4>赞助</h4>
            </div>
        )
    }
}
