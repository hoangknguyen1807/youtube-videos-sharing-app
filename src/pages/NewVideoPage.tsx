import ShareVideoForm from '../components/form/ShareVideoForm';

const NewVideoPage: React.FC = () => {
    console.log('NewVideoPage');
    return (
        <>
            <h2 className="text-[1.5rem] font-bold pt-6 mx-auto">Share new video</h2>

            <ShareVideoForm />
        </>
    );
};

export default NewVideoPage;
