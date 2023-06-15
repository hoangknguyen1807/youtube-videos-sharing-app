import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListVideos } from '../components/ListVideos';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMyVideosAction } from '../redux/slices/videos/videosSlice';

const MyVideosPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isSuccess } = useAppSelector((state) => state.videos);
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!user) {
            navigate('/authentication/signin');
        }
        dispatch(fetchMyVideosAction({ status: 'ACTIVE' }));
    }, [dispatch, navigate, isSuccess, user]);

    return (
        <div className="flex-1 text-right">
            <div className="my-4">
                <button
                    onClick={() => {
                        navigate('/new-video');
                    }}
                    className="px-8 border py-1 rounded-md mr-3 bg-submit text-secondary "
                >
                    Share video +
                </button>
            </div>
            <ListVideos />
        </div>
    );
};

export default MyVideosPage;
