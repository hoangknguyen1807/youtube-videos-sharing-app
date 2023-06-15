import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { fetchVideosApi, shareVideoApi, fetchMyVideosApi } from '../../../api';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IYouTubeVideosSliceState, IShareVideoError, IShareVideoForm, IYouTubeVideo } from './type';

const initialState: IYouTubeVideosSliceState = {
    videos: [],
    page: 1,
    perPage: 10,
    bidLoading: false,
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

// export const bidAction = createAsyncThunk<YouTubeVideo, BidForm, { rejectValue: VideoError }>(
//     '/bid/bid',
//     async (payload, { rejectWithValue }) => {
//         try {
//             return await fetchMyVideosApi(payload.id, payload.bidPrice);
//         } catch (error) {
//             return rejectWithValue(error as VideoError);
//         }
//     }
// );

const videosSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        // selectBidAction(state: YouTubeVideosSliceState, action: PayloadAction<number>) {
        //     state.selected = state.videos[action.payload];
        // },
        // changeBidTypeAction(state: YouTubeVideosSliceState, action: PayloadAction<'ON_GOING' | 'COMPLETED' | 'DRAFT'>) {
        //     state.type = action.payload;
        // },
        // clearBidSelectedAction(state: YouTubeVideosSliceState) {
        //     state.selected = undefined;
        // },
        // durationToZeroAction(state, action: PayloadAction<YouTubeVideo>) {
        //     state.expiredBid = [...state.expiredBid, action.payload];
        //     state.videos = state.videos.filter((bid) => bid.id !== action.payload.id);
        // },
        setNewVideo(state: IYouTubeVideosSliceState, action: PayloadAction<IYouTubeVideo>) {
            state.videos = [...state.videos, action.payload];
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
            // if (meta.arg.status === 'DRAFT') {
            //     state.draftBids = payload.items;
            //     return;
            // }
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

        // //Publish
        // builder.addCase(publishBidAction.pending, (state, { meta }) => {
        //     state.publishing = state.videos[meta.arg];
        // });
        // builder.addCase(publishBidAction.fulfilled, (state, { payload }) => {
        //     state.draftBids = state.draftBids.filter((element) => element.id !== payload.id);
        //     state.publishing = undefined;
        //     state.isSuccess = false;
        //     toast.success('Publish successfully');
        // });
        // builder.addCase(publishBidAction.rejected, (state, { payload, error }) => {
        //     state.publishing = undefined;
        //     toast.error(error.message ?? 'Publish failed');
        // });

        // //Bid
        // builder.addCase(bidAction.pending, (state, { meta }) => {
        //     state.bidLoading = true;
        // });
        // builder.addCase(bidAction.fulfilled, (state, { meta, payload }) => {
        //     state.bidLoading = false;
        //     state.selected = undefined;
        //     state.bidTime = Date.now();
        //     state.videos = state.videos.map((bid) =>
        //         bid.id !== payload.id ? bid : { ...bid, currentPrice: payload.currentPrice }
        //     );
        //     toast.success('Bid successfully');
        // });
        // builder.addCase(bidAction.rejected, (state, { payload }) => {
        //     state.bidLoading = false;
        //     state.selected = undefined;
        //     toast.error(payload?.errors.url?.messages[0] ?? payload?.message);
        // });

        //Load more
        builder.addCase(loadMoreVideosAction.pending, (state) => {
            state.page = state.page + 1;
        });
        builder.addCase(loadMoreVideosAction.fulfilled, (state, { payload }) => {
            // if (state.type === 'DRAFT') {
            //     state.draftBids = [...state.draftBids, ...payload.items];
            //     return;
            // }
            state.videos = [...state.videos, ...payload.items];
        });
        builder.addCase(loadMoreVideosAction.rejected, () => {});
    }
});

const { reducer, actions } = videosSlice;
export const { setNewVideo, resetToastContent } = actions;
export default reducer;
