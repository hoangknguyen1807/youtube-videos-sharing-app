import classNames from 'classnames';
import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    label: string;
}
export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, InputProps>((props, ref) => {
    return (
        <div className="pt-3">
            <label className="text-text text-[1rem] font-medium" htmlFor={props.id}>
                {props.label}
            </label>
            <div className="relative mt-2">
                <input
                    ref={ref}
                    className={classNames('w-full bg-primary  rounded-md py-2 px-2 border outline-0  text-[0.8rem]', {
                        'border-red-500': props.error
                    })}
                    {...props}
                    type={props.type || 'text'}
                />
            </div>
        </div>
    );
});

export { Input };
