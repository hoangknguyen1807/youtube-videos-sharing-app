import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { shareVideoAction } from '../../redux/slices/videos/videosSlice';
import { Input } from '../base/Input';
import { IShareVideoForm } from '../../redux/slices/videos/type';

const ShareVideoForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector((state) => state.videos);
    const {
        register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm<IShareVideoForm>();

    const onSubmit: SubmitHandler<IShareVideoForm> = (data) => {
        dispatch(shareVideoAction(data));
    };

    useEffect(() => {
        if (isSuccess) {
            control._reset();
            navigate('/my-videos');
        }
    }, [isSuccess, control, navigate]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mt-10 mx-auto">
            <Input label="Video URL" error={errors.url} id="url" {...register('url', { required: true })} />

            <div className=" flex justify-center mt-10 ">
                <input
                    className="bg-red-600 w-40 py-2 mx-2 my-5  text-[1rem] font-medium text-white rounded-md cursor-pointer"
                    type="button"
                    value="Cancel"
                    onClick={() => navigate('/my-videos')}
                />
                <input
                    className="bg-submit w-40 py-2 mx-2 my-5  text-[1rem] font-medium text-white rounded-md cursor-pointer"
                    type="submit"
                    value="Share"
                />
            </div>
        </form>
    );
};

export default ShareVideoForm;
