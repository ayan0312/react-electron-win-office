import React from 'react';

import styles from './Import.scss';

interface IProps {}

export default class Import extends React.Component<IProps> {
    render() {
        return (
            <div className={styles.component}>
                <h4>导入数据</h4>
            </div>
        );
    }
}
