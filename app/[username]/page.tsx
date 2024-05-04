interface ProfilePageParams {
    params: {
        username: string
    };
};

const ProfilePage = ({ params } : ProfilePageParams) => {
    return (
        <div>
            You are { params.username }.
        </div>
    );
};

export default ProfilePage;