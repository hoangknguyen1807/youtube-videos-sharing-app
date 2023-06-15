import { useEffect } from 'react';
import { ListVideos } from '../components/ListVideos';
import { useAppDispatch } from '../hooks';
import { fetchVideosAction } from '../redux/slices/videos/videosSlice';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchVideosAction({ status: 'ACTIVE' }));
    }, [dispatch]);

    return (
        <div className="flex-1">
            <ListVideos />
        </div>
    );
};

export default HomePage;
