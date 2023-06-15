import classNames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading: React.FC = () => {
    return (
        <div
            className={classNames(
                'fixed w-full h-full z-50 top-0 left-0 bg-black/20 overflow-auto flex justify-center items-center'
            )}
        >
            <ClipLoader />
        </div>
    );
};
export { Loading };
