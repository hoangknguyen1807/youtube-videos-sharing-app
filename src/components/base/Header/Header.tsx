import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logoutAction } from '../../../redux/slices/user/userSlice';

interface MenuItem {
    name: string;
    handle: Function;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const menus: MenuItem[] = [
        {
            name: 'Share new video',
            handle: () => {
                navigate('/new-video');
            }
        },
        {
            name: 'Sign out',
            handle: () => {
                dispatch(logoutAction());
            }
        }
    ];
    return (
        <header className="bg-primary h-24 px-32 py-5 flex justify-between items-center z-10">
            <Link to={'/'} className="text-[1.5rem] font-bold">
                YouTube Videos Sharing App
            </Link>
            <div className=" flex items-center">
                <p className="mr-4">
                    Welcome <span className="font-semibold text-text cursor-pointer hover:underline"
                                onClick={() => navigate('/my-videos')}>
                                {!!user ? user.email : 'Guest'}
                            </span>
                </p>
                <div>
                    {!!user ?
                        menus.map((menu) => (
                            <button key={menu.name}
                                onClick={() => menu.handle()}
                                className="px-8 border py-1 rounded-md mr-3 bg-submit text-secondary"
                            >
                                {menu.name}
                            </button>
                        )) :
                        <button 
                            onClick={() => navigate('/authentication/signin')}
                            className="px-8 border py-1 rounded-md mr-3 bg-submit text-secondary"
                        >
                            Sign in
                        </button>
                    }
                </div>
            </div>
        </header>
    );
};

export { Header };
