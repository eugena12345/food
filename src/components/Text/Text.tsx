import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
    className?: string;
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'accent';
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
    className, view, tag = 'p', weight, children, color, maxLines = 100
}) => {
    const getClassNames = () => {
        const resultClassNames: string[] = [];
        if (className) {
            resultClassNames.push(className);
        }
        if (view) {
            resultClassNames.push(styles[view]);
        }
        if (weight) {
            resultClassNames.push(styles[weight]);
        }
        if (color) {
            resultClassNames.push(styles[color]);
        }
        return resultClassNames.join(' ')
    }

    const style: React.CSSProperties = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        MozBoxOrient: 'vertical',
        display: '-webkit-box',
        WebkitLineClamp: typeof maxLines === 'number' && maxLines > 0 ? maxLines : 100,
        WebkitBoxOrient: 'vertical',
        lineClamp: typeof maxLines === 'number' && maxLines > 0 ? maxLines : 100,
    };

    const renderTag = (someTag: string) => {
        switch (someTag) {
            case 'h1':
                return <h1 className={getClassNames()} style={style} >{children}</h1>;
            case 'h2':
                return <h2 className={getClassNames()} style={style}>{children}</h2>;
            case 'h3':
                return <h3 className={getClassNames()} style={style}>{children}</h3>;
            case 'h4':
                return <h4 className={getClassNames()} style={style}>{children}</h4>;
            case 'h5':
                return <h5 className={getClassNames()} style={style}>{children}</h5>;
            case 'h6':
                return <h6 className={getClassNames()} style={style}>{children}</h6>;
            case 'div':
                return <div className={getClassNames()} style={style}>{children}</div>;
            case 'span':
                return <span className={getClassNames()} style={style}>{children}</span>;
            case 'p':
                return <p className={getClassNames()} style={style}>{children}</p>;
            default:
                return <p className={getClassNames()} style={style}>{children}</p>;
        }
    }
    return renderTag(tag);

}

export default Text;
