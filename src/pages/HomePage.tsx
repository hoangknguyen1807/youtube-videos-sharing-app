import classNames from 'classnames';
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
            {false && (
                <div
                    className={classNames(
                        'fixed  w-full h-full z-50 top-0 left-0 bg-black/20 overflow-auto flex justify-center items-center'
                    )}
                >
                    <div className="w-90 bg-white px-10 py-6 rounded-lg">
                        {/* <h2 className="text-[20px] font-semibold">{selected.name}</h2> */}
                        {/* <ShareVideoForm id={selected.id} currentPrice={selected.currentPrice} /> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
