import { INewVideoToastProps } from '../../../components/base/toasts/NewVideoToast.props';

export interface IYouTubeVideo {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
    user: User;
}

export interface IYouTubeVideosSliceState {
    videos: IYouTubeVideo[];
    page: number;
    perPage: number;
    count?: number;
    selected?: IYouTubeVideo;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message?: string;
    toastContent?: INewVideoToastProps;
    type: 'ACTIVE' | 'INACTIVE';
}

export interface IShareVideoForm {
    url: string;
}

export interface IShareVideoError {
    errors: {
        url?: {
            messages: string[];
        };
    };
    message: string;
}

export interface IVideoError {
    errors: {
        url?: {
            messages: string[];
        };
    };
    message: string;
}
