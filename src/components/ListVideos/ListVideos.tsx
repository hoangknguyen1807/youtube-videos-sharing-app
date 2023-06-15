import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IYouTubeVideo } from '../../redux/slices/videos/type';
import { loadMoreVideosAction } from '../../redux/slices/videos/videosSlice';
import VideoItem from './VideoItem';

const ListVideos: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isError, message, count, videos } = useAppSelector((state) => state.videos);
    const listVideos = videos;

    return (
        <div>
            <div className="px-3 flex top-0 py-3 items-center">
                <div className="flex-[5] text-left text-[1.5rem] font-semibold">Shared Videos</div>
            </div>
            <div className="h-[100rem] overflow-auto flex flex-col" id="scrollDiv">
                <div className="flex-1 h-auto">
                    {isLoading && (
                        <div>
                            <ClipLoader />
                        </div>
                    )}

                    {isError && (
                        <div className="flex justify-center items-center h-auto ">
                            <p className="text-center">{message ?? 'Fetch error!'}</p>
                        </div>
                    )}
                    {listVideos.length === 0 && !isLoading && !isError ? (
                        <div className=" flex justify-center items-center h-auto">There's no videos at the moment</div>
                    ) : (
                        <InfiniteScroll
                            scrollableTarget={'scrollDiv'}
                            dataLength={listVideos.length}
                            next={() => {
                                dispatch(loadMoreVideosAction());
                            }}
                            hasMore={!!count && listVideos.length < count}
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
        </div>
    );
};

export { ListVideos };
