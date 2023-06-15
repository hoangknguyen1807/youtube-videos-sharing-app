import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/base/Loading';
import SignUpForm from '../components/form/authentication/SignUpForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { cleanStatusState } from '../redux/slices/user/userSlice';

const SignUpPage: React.FC = () => {
    const { isLoading, isSuccess } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isSuccess) {
            navigate('/authentication/signin');
        }
        dispatch(cleanStatusState());
    }, [isSuccess, navigate, dispatch]);
    return (
        <>
            <h2 className="text-[1.5rem] font-bold">Sign Up</h2>
            <SignUpForm />
            {isLoading && <Loading />}
        </>
    );
};

export default SignUpPage;
