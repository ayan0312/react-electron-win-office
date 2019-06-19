import React from 'react';
import cx from 'classnames';

import styles from './Button.scss';

interface IProps {
    text?: string;
    type?: string;
    className?: string;
    [x: string]: any;
}

class Button extends React.Component<IProps> {
    render() {
        const { text = '', type = 'default', className = '', ...props } = this.props;

        return (
            <button
                className={cx(styles.component, {
                    [className]: className,
                    [styles[type]]: type,
                })}
                {...props}
            >
                <span>{text}</span>
            </button>
        );
    }
}

export default Button;
