import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/base/layouts/MainLayout';
import AuthLayout from '../components/base/layouts/AuthLayout';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
import NewVideoPage from '../pages/NewVideoPage';
import MyVideosPage from '../pages/MyVideosPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="new-video" element={<NewVideoPage />} />
                <Route path="my-videos" element={<MyVideosPage />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="authentication/signin" element={<SignInPage />} />
                <Route path="authentication/signup" element={<SignUpPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
