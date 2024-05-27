import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../redux/authSlice";

function ProfileAvatar() {
  const [avatar, setAvatar] = useState();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = () => {
    dispatch(updateAvatar({ id: user._id, avatar: avatar }));
  };

  return (
    <div>
      <div className="mt-4 rounded-full overflow-hidden h-60 w-60 hover: cursor-pointer">
        <img
          className="h-60 w-60"
          src={avatar ? URL.createObjectURL(avatar) : user.avatar}
          alt="avatar"
        />
        <input
          type="file"
          className=" top-28 z-10 absolute opacity-0 overflow-hidden h-60 w-60 ml-120 hover:scale-110 transition-shadow cursor-pointer"
          onChange={changeAvatar}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update Avatar
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
