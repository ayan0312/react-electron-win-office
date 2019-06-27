import React from 'react';

import styles from './Export.scss';

interface IProps {}

export default class Export extends React.Component<IProps> {
    render() {
        return (
            <div className={styles.component}>
                <h4>导出数据</h4>
            </div>
        );
    }
}
