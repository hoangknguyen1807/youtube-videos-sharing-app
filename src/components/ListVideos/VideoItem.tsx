import classNames from 'classnames';
import { IYouTubeVideo } from '../../redux/slices/videos/type';
import { Link } from 'react-router-dom';

interface VideoItemProps {
    index: number;
    video: IYouTubeVideo;
}

const VideoItem: React.FC<VideoItemProps> = ({ index, video }) => {
    return (
        <div
            className={classNames('h-auto flex justify-between items-start px-3 rounded-lg my-5')}
        >
            <div className='flex items-center'>
                <Link to={video.url} target='_blank'>
                    <img height={180} width={320} src={video.thumbnailUrl} alt={video.title} />
                </Link>
            </div>
            <div className='flex-[5] flex-col ml-6 mt-6 text-[15px] text-left'>
                <Link to={video.url} target='_blank'>
                    <div className='text-submit font-bold text-lg mb-2'>{video.title}</div>
                </Link>
                <div className='mb-1'>Shared by <span className='font-semibold'>{video.user.email}</span></div>
                <div>Description:</div>
                <div>{video.description}</div>
            </div>
        </div>
    );
};

export default VideoItem;
