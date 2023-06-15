import { IShareVideoForm } from '../../redux/slices/videos/type';
import axiosClient from '../clientApi';

export const fetchVideosApi = (status: 'ACTIVE' | 'INACTIVE', page?: number, perPage?: number) => {
    return new Promise<FetchVideosResponse>(async (resolve, reject) => {
        try {
            const response = await axiosClient.get<FetchVideosResponse>('/videos', {
                params: {
                    status,
                    page: page ?? 1,
                    perPage: perPage ?? 10
                }
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const fetchMyVideosApi = (status: 'ACTIVE' | 'INACTIVE', page?: number, perPage?: number) => {
    return new Promise<FetchVideosResponse>(async (resolve, reject) => {
        try {
            const response = await axiosClient.get<FetchVideosResponse>(`/videos/my-videos`, {
                params: {
                    status,
                    page: page ?? 1,
                    perPage: perPage ?? 10
                }
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const shareVideoApi = (params: IShareVideoForm) => {
    return new Promise(async (resolve, reject) => {
        try {
            await axiosClient.post<FetchVideosResponse>('/videos', {
                ...params
            });

            resolve(null);
        } catch (error) {
            reject(error);
        }
    });
};
