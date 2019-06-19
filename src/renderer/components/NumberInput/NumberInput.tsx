import React from 'react';
import cx from 'classnames';

import styles from './NumberInput.scss';

interface IProps {
    zIndex?: number;
    className?: string;
    [x: string]: any;
}

class NumberInput extends React.Component<IProps> {
    render() {
        const { className = '', ...props } = this.props;

        return (
            <input
                className={cx(styles.component, {
                    [className]: className,
                })}
                type="number"
                {...props}
            />
        );
    }
}

export default NumberInput;
