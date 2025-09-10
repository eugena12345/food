import * as React from 'react';
import { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
    const getClassNames = () => {
        const resultClassnames: string[] = [];
        if (props.className) {
            resultClassnames.push(props.className);
        }
        if (props.color) {
            resultClassnames.push(props.color);
        }
        return resultClassnames.join(' ');
    }
    return (
        <div className={getClassNames()}>
            <svg className={getClassNames()}
                width={props.width || 24}
                height={props.height || 24}
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" stroke-width="2" />
            </svg>
        </div>


    )
}

export default CheckIcon;
