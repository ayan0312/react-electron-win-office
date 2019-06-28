import React from 'react';

import styles from './Timer.scss';

import Button from '../../components/Button/Button';
import NumberInput from '../../components/NumberInput/NumberInput';
import TimerMenu from './components/TimerMenu/TimerMenu';

interface IPrors {}

class Timer extends React.Component<IPrors> {
    public state = {
        workTime: 25,
        restTime: 5,
        visible: false,
    };

    public showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    public onClose = () => {
        this.setState({
            visible: false,
        });
    };

    public workChange() {
        return (event: any) => {
            this.setState({ workTime: event.target.value });
        };
    }

    public restChange() {
        return (event: any) => {
            this.setState({ restTime: event.target.value });
        };
    }

    render() {
        return (
            <div className={styles.component}>
                <p className={styles.time}>00:00</p>

                <div className={styles.options}>
                    <p>
                        工作时间：
                        <NumberInput value={this.state.workTime} onChange={this.workChange()} />
                    </p>
                    <p>
                        休息时间：
                        <NumberInput value={this.state.restTime} onChange={this.restChange()} />
                    </p>
                </div>
                <div className={styles.controls}>
                    <Button type="primary" text="开始计划" />
                    <Button text="选择计划" />
                    <Button text="设置" onClick={this.showDrawer} />

                    <Button type="primary" text="工作" />
                    <Button text="取消" />
                </div>
                <TimerMenu onClose={this.onClose} visible={this.state.visible} />
            </div>
        );
    }
}

export default Timer;
