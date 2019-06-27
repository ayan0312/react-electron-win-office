import React from 'react';

import styles from './MoreSetting.scss';

interface IProps {}

export default class MoreSetting extends React.Component<IProps> {
    render() {
        return (
            <div className={styles.component}>
                <h4>更多设置</h4>
            </div>
        );
    }
}
