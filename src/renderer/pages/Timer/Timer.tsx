import React from 'react';
import styles from './Timer.scss';
import Button from '../../components/Button/Button';
import NumberInput from '../../components/NumberInput/NumberInput';

interface IPrors {}

class Timer extends React.Component<IPrors> {
    render() {
        const text = () => {
            let index = 0;

            return (e: any) => {
                index += 1;
            };
        };

        const getNumber = (e: any) => {
            return 1;
        };

        return (
            <div className={styles.component}>
                <p className={styles.time}>00:00</p>

                <div className={styles.options}>
                    <p>
                        工作时间：
                        <NumberInput onChange={getNumber} />
                    </p>
                    <p>
                        休息时间：
                        <NumberInput />
                    </p>
                </div>
                <div className={styles.controls}>
                    <Button type="primary" text="工作">
                        21
                    </Button>
                    <Button type="primary" text="休息">
                        21
                    </Button>
                    <Button text="取消">21</Button>
                    <Button text="查看当前时间">21</Button>
                </div>
            </div>
        );
    }
}

export default Timer;
