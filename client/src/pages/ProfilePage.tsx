import Navbar from "../components/Navbar";
import { ProfileUpdate } from "../components/ProfileUpdate";

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ProfileUpdate />
    </div>
  );
};

export default ProfilePage;
