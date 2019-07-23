import React from 'react'

import styles from './HistoryPlan.scss'

interface IProps {}

export default class HistoryPlan extends React.Component<IProps> {
    render() {
        return (
            <div className={styles.component}>
                <h4>历史计划</h4>
            </div>
        )
    }
}
