import useAuth from "../../../Hooks/useAuth";
const Profile = () => {
  const { user } = useAuth();
  const { displayName, email, phoneNumber, photoURL } = user;
  return (
    <div className="h-screen dark:bg-primary-dark">
      <h2 className="mb-7 font-semibold text-2xl text-[#eb6753]">My Profile</h2>
      <div className="space-y-5">
        <div className=" flex items-center gap-4 border  py-4 px-3">
          <img
            className="h-24 w-24 rounded-full border border-[#eb6753]"
            src={
              photoURL
                ? photoURL
                : "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg"
            }
            alt="profile image"
          />
          <div>
            <h3 className="font-semibold text-xl">
              {displayName ? displayName : "No User Name"}
            </h3>
            <p className="text-gray-500">User Role</p>
          </div>
        </div>
        <div className="border  py-4 px-3">
          <h2 className="font-semibold text-xl mb-2 text-[#eb6753]">
            Personal Information
          </h2>
          <div className="flex gap-5">
            <div>
              <p>
                <span className="font-semibold">First Name:</span>{" "}
              </p>
              <p>
                <span className="font-semibold">Last Name:</span>{" "}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Email:{email}</span>{" "}
              </p>
              <p>
                <span className="font-semibold">Phone:{phoneNumber}</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="border  py-4 px-3">
          <h2 className="font-semibold text-xl mb-2 text-[#eb6753]">
            Address:{" "}
          </h2>
          <p>Address.....</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
