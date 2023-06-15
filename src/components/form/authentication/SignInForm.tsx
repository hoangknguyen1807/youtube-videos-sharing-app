import { SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '../../../utils/validateData';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { signinAction } from '../../../redux/slices/user/userSlice';
import { Input } from '../../base/Input';

interface SignInFormInput {
    email: string;
    password: string;
}

const SignInForm: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<SignInFormInput>({
        mode: 'onChange'
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<SignInFormInput> = (data) => {
        dispatch(signinAction({ email: data.email, password: data.password }));
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Enter Email"
                    error={errors.email}
                    type="text"
                    id="email"
                    {...register('email', {
                        required: true,
                        validate: validateEmail
                    })}
                />

                <Input
                    label="Enter Password"
                    error={errors.password}
                    type="password"
                    id="password"
                    {...register('password', {
                        required: true,
                        validate: validatePassword
                    })}
                />
                <div className="flex items-center justify-between">
                    <p className="text-[0.8rem] text-center">
                        No account? Click here{' '}
                        <Link to="/authentication/signup" className="underline text-submit font-semibold">
                            Sign Up
                        </Link>
                    </p>
                    <input
                        className="bg-submit px-8 py-2 my-5 text-[1rem] font-medium text-white rounded-md cursor-pointer"
                        type="submit"
                        value="Sign In"
                    />
                </div>
            </form>
        </>
    );
};

export default SignInForm;
