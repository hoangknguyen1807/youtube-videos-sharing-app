import classNames from 'classnames';
import { IYouTubeVideo } from '../../redux/slices/videos/type';

interface VideoItemProps {
    index: number;
    video: IYouTubeVideo;
}

const VideoItem: React.FC<VideoItemProps> = ({ index, video }) => {
    return (
        <div
            className={classNames('h-auto flex justify-between items-center px-3 rounded-lg my-5')}
        >
            <div className="flex items-center">
                <img src={video.thumbnailUrl} alt={video.title} />
            </div>
            <div className="flex-[5] text-[15px] text-submit  text-left">{video.title}</div>
        </div>
    );
};

export default VideoItem;
