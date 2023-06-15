import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUserDetailAction, setSocket } from '../../../redux/slices/user/userSlice';
import { IYouTubeVideo } from '../../../redux/slices/videos/type';
import { resetToastContent, setNewVideo } from '../../../redux/slices/videos/videosSlice';
import socketIo from '../../../socket';
import { Header } from '../Header';
import NewVideoToast from '../toasts/NewVideoToast';

const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { socket } = useAppSelector((state) => state.user);
    const { toastContent } = useAppSelector((state) => state.videos);

    if (toastContent) {
      toast(<NewVideoToast {...toastContent}/>);
      dispatch(resetToastContent());
    }

    //Socket start
    useEffect(() => {
        if (!socket) {
            dispatch(setSocket({ socketIo }));
            let socketConnection = socketIo.connect();
            socketIo.removeAllListeners('connect');

            socketConnection.on('connect', () => {
                console.log('Socket connected successfully');
            });

            socketConnection.on('new-video-shared', (data: IYouTubeVideo) => {
                dispatch(setNewVideo(data));
            });
        }

        return () => {
            socketIo.disconnect();
        };
    }, [dispatch, socket]);
    //Socket end

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) dispatch(getUserDetailAction(token));
    }, [dispatch, token]);

    return (
        <div className="bg-secondary h-auto w-full flex flex-col">
            <Header />
            <div className=" px-40 flex-1 flex flex-col">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
