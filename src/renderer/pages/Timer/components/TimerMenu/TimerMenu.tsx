import React from 'react';

import styles from './TimerMenu.scss';

interface IProps {}

export default class TimerMenu extends React.Component<IProps> {
    public state = {};

    public render() {
        return (
            <ul className={styles.component}>
                <h4>选项</h4>
                <li>
                    <span>设置计划</span>
                </li>
                <li>
                    <span>历史计划</span>
                </li>
                <h4>高级选项</h4>
                <li>
                    <span>导出数据</span>
                </li>
                <li>
                    <span>导入数据</span>
                </li>
                <li>
                    <span>更多设置</span>
                </li>
                <h4>关于</h4>
                <li>
                    <span>赞助</span>
                </li>
                <li>
                    <span>帮助</span>
                </li>
                <li>
                    <span>开发者</span>
                </li>
            </ul>
        );
    }
}
