import React from 'react';

import styles from './SetPlan.scss';

import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

interface IProps {}

export default class SetPlan extends React.Component<IProps> {
    public onChange = (date: any, dateString: any) => {};

    render() {
        return (
            <div className={styles.component}>
                <h4>设置计划</h4>
                <p style={{ textIndent: '1em' }}>
                    <strong>注意：</strong>
                    如果不填些日期范围的话，会默认添加到基础计划，可通过选择开始。
                </p>
                <p style={{ margin: '15px 0 5px 0' }}>
                    <strong>开始日期：</strong>
                </p>
                <DatePicker onChange={this.onChange} />
                <p style={{ margin: '15px 0 5px 0' }}>
                    <strong>结束日期：</strong>
                </p>
                <DatePicker onChange={this.onChange} />
                <br />
            </div>
        );
    }
}
