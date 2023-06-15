import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadMoreVideosAction } from '../../redux/slices/videos/videosSlice';
import VideoItem from './VideoItem';
import { IYouTubeVideo } from '../../redux/slices/videos/type';

const mockVideos: IYouTubeVideo[] = [
    {
        id: '1',
        title: 'Lorem ipsum dolor sit amet',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        url: 'https://www.youtube.com/watch?v=ZDKg6eVpY7k',
        thumbnailUrl: 'https://i.ytimg.com/vi/y9T2odcfpC4/hqdefault.jpg',
        status: 'ACTIVE',
        createdAt: '1686822011',
        user: {
            id: '1',
            email: 'usera@mailnesia.com'
        }
    },
    {
        id: '2',
        title: 'Lorem ipsum dolor sit amet',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        url: 'https://www.youtube.com/watch?v=ZDKg6eVpY7k',
        thumbnailUrl: 'https://i.ytimg.com/vi/y9T2odcfpC4/hqdefault.jpg',
        status: 'ACTIVE',
        createdAt: '1686822012',
        user: {
            id: '1',
            email: 'usera@mailnesia.com'
        }
    },
    {
        id: '3',
        title: 'Lorem ipsum dolor sit amet',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        url: 'https://www.youtube.com/watch?v=ZDKg6eVpY7k',
        thumbnailUrl: 'https://i.ytimg.com/vi/y9T2odcfpC4/hqdefault.jpg',
        status: 'ACTIVE',
        createdAt: '1686822013',
        user: {
            id: '1',
            email: 'usera@mailnesia.com'
        }
    }
];

const ListVideos: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isError, message, count, videos } = useAppSelector((state) => state.videos);
    // const listVideos = videos;
    const listVideos: IYouTubeVideo[] = mockVideos;

    return (
        <div className="h-[30rem] overflow-auto flex flex-col" id="scrollDiv">
            <div className="px-3 flex top-0 py-3 items-center sticky bg-secondary">
                <div className="flex-[5] text-left text-[15px] font-semibold">Shared Videos</div>
            </div>
            <div className="flex-1 h-full">
                {isLoading && (
                    <div className="flex justify-center items-center h-full ">
                        <ClipLoader />
                    </div>
                )}

                {isError && (
                    <div className="flex justify-center items-center h-full ">
                        <p className="text-center">{message ?? 'Fetch error!'}</p>
                    </div>
                )}
                {listVideos.length === 0 && !isLoading && !isError ? (
                    <div className=" flex justify-center items-center h-full">There's no videos at the moment</div>
                ) : (
                    <InfiniteScroll
                        scrollableTarget={'scrollDiv'}
                        dataLength={listVideos.length}
                        next={() => {
                            dispatch(loadMoreVideosAction());
                        }}
                        hasMore={!!count && listVideos.length <= count}
                        loader={
                            <div className="" key={0}>
                                Loading ...
                            </div>
                        }
                    >
                        {listVideos.map((item: IYouTubeVideo, index: any) => (
                            <VideoItem key={item.id} video={item} index={index} />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export { ListVideos };
