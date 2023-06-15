import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/base/Loading';
import SignInForm from '../components/form/authentication/SignInForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { cleanStatusState } from '../redux/slices/user/userSlice';

const SignInPage: React.FC = () => {
    const { isLoading, isSuccess } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
        dispatch(cleanStatusState());
    }, [isSuccess, navigate, dispatch]);
    return (
        <>
            <h2 className="text-[1.5rem] font-bold">Sign In</h2>
            <SignInForm />
            {isLoading && <Loading />}
        </>
    );
};

export default SignInPage;
