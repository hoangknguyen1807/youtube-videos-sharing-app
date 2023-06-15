import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { registerAction } from '../../../redux/slices/user/userSlice';
import { validateEmail, validatePassword } from '../../../utils/validateData';

interface RegisterFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const {
        getValues,
        register,
        formState: { errors },
        handleSubmit
    } = useForm<RegisterFormInput>({
        mode: 'onChange'
    });

    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
        dispatch(registerAction({ email: data.email, password: data.password }));
    };

    const validateConfirmPassword = (password: string): boolean => {
        return getValues().password === getValues().confirmPassword;
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5">
                    <label className="text-text text-[1rem] font-medium" htmlFor="email">
                        Enter email
                    </label>
                    <input
                        className={classNames(
                            'w-full bg-primary mt-2 rounded-md py-2 px-2 border outline-0  text-[0.8rem]',
                            { 'border-red-500': errors.email }
                        )}
                        type="text"
                        id="email"
                        {...register('email', {
                            required: true,
                            validate: validateEmail
                        })}
                    />
                    <p>{errors.email && 'Invalid email'}</p>
                </div>
                <div className="my-5">
                    <label className="text-text text-[1rem] font-medium" htmlFor="password">
                        Enter password
                    </label>
                    <div className="relative mt-2">
                        <input
                            className={classNames(
                                'w-full bg-primary  rounded-md py-2 px-2 border outline-0 text-[0.8rem]',
                                { 'border-red-500': errors.password }
                            )}
                            type="password"
                            id="password"
                            {...register('password', {
                                required: true,
                                validate: validatePassword
                            })}
                        />
                    </div>
                </div>
                <div className="my-5">
                    <label className="text-text text-[1rem] font-medium" htmlFor="confirmPassword">
                        Re-enter password
                    </label>
                    <div className="relative mt-2">
                        <input
                            className={classNames(
                                'w-full bg-primary  rounded-md py-2 px-2 border outline-0 text-[0.8rem]',
                                { 'border-red-500': errors.confirmPassword }
                            )}
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: true,
                                validate: validateConfirmPassword
                            })}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[0.8rem] text-center">
                        Already have an account?{' '}
                        <Link to="/authentication/signin" className="underline text-submit font-semibold">
                            Sign In
                        </Link>
                    </p>
                    <input
                        className="bg-submit px-8 py-2 my-5  text-[1rem] font-medium text-white rounded-md cursor-pointer"
                        type="submit"
                        value="Sign Up"
                    />
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
