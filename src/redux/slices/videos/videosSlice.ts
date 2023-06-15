import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { fetchVideosApi, shareVideoApi, fetchMyVideosApi } from '../../../api';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IYouTubeVideosSliceState, IShareVideoError, IShareVideoForm, IYouTubeVideo } from './type';

const initialState: IYouTubeVideosSliceState = {
    videos: [],
    page: 1,
    perPage: 10,
    isLoading: false,
    isError: false,
    isSuccess: false,
    type: 'ACTIVE',
    toastContent: undefined
};

export const fetchVideosAction = createAsyncThunk<FetchVideosResponse, { status: 'ACTIVE' | 'INACTIVE' }>(
    '/videos',
    async (payload) => {
        return await fetchVideosApi(payload.status);
    }
);

export const fetchMyVideosAction = createAsyncThunk<FetchVideosResponse, { status: 'ACTIVE' | 'INACTIVE' }>(
    '/my-videos',
    async (payload) => {
        return await fetchMyVideosApi(payload.status);
    }
);

export const loadMoreVideosAction = createAsyncThunk<FetchVideosResponse>(
    '/videos/load_more',
    async (payload, { getState }) => {
        const state: RootState = getState() as RootState;
        return await fetchVideosApi(state.videos.type, state.videos.page, state.videos.perPage);
    }
);

export const loadMoreMyVideosAction = createAsyncThunk<FetchVideosResponse>(
    '/videos/load_more',
    async (payload, { getState }) => {
        const state: RootState = getState() as RootState;
        return await fetchMyVideosApi(state.videos.type, state.videos.page, state.videos.perPage);
    }
);

export const shareVideoAction = createAsyncThunk<any, IShareVideoForm, { rejectValue: IShareVideoError }>(
    '/videos/share',
    async (payload, { rejectWithValue }) => {
        try {
            return await shareVideoApi(payload);
        } catch (error) {
            return rejectWithValue(error as IShareVideoError);
        }
    }
);

const videosSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setNewVideo(state: IYouTubeVideosSliceState, action: PayloadAction<IYouTubeVideo>) {
            state.videos = [ action.payload, ...state.videos ];
            state.toastContent = { userEmail: action.payload.user.email, title: action.payload.title };
        },
        resetToastContent(state: IYouTubeVideosSliceState) {
            state.toastContent = undefined;
        }
    },
    extraReducers: (builder) => {
        // Fetch videos
        builder.addCase(fetchVideosAction.pending, (state, { meta }) => {
            state.type = meta.arg.status;
            state.isLoading = true;
            state.isError = false;
            state.page = 1;
            state.videos = [];
        });
        builder.addCase(fetchVideosAction.fulfilled, (state, { payload, meta }) => {
            state.isLoading = false;
            state.count = payload.count;
            state.videos = payload.items;
        });
        builder.addCase(fetchVideosAction.rejected, (state, { payload, error }) => {
            state.isLoading = false;
            state.isError = true;
            state.message = error.message;
        });

        // Fetch My videos
        builder.addCase(fetchMyVideosAction.pending, (state, { meta }) => {
            state.type = meta.arg.status;
            state.isLoading = true;
            state.isError = false;
            state.page = 1;
            state.videos = [];
        });
        builder.addCase(fetchMyVideosAction.fulfilled, (state, { payload, meta }) => {
            state.isLoading = false;
            state.count = payload.count;
            state.videos = payload.items;
        });
        builder.addCase(fetchMyVideosAction.rejected, (state, { payload, error }) => {
            state.isLoading = false;
            state.isError = true;
            state.message = error.message;
        });

        // Share video
        builder.addCase(shareVideoAction.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = true;
        });
        builder.addCase(shareVideoAction.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            toast.success('Shared video successfully');
        });
        builder.addCase(shareVideoAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload?.errors?.url?.messages[0] ?? 'Share video error');
        });

        //Load more
        builder.addCase(loadMoreVideosAction.pending, (state) => {
            state.page = state.page + 1;
        });
        builder.addCase(loadMoreVideosAction.fulfilled, (state, { payload }) => {
            state.videos = [...state.videos, ...payload.items];
        });
        builder.addCase(loadMoreVideosAction.rejected, () => {});
    }
});

const { reducer, actions } = videosSlice;
export const { setNewVideo, resetToastContent } = actions;
export default reducer;
