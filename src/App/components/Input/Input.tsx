import React, { memo } from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
    return (
      <div className={styles.container}>
        <input type="text" placeholder='Text' value={value} onChange={handleChange} ref={ref}  {...rest} />
        {afterSlot && afterSlot}
      </div>
    )
  });

export default memo(Input);
