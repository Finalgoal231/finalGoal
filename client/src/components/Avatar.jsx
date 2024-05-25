import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../redux/authSlice";

function ProfileAvatar() {
  const [avatar, setAvatar] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
    console.log(user.avatar);
  };

  const handleSubmit = () => {
    dispatch(updateAvatar({id: user._id, avatar: avatar}));
  };

  return (
    <div>
      <div className="mt-10 rounded-full overflow-hidden h-60 w-60 ml-20 hover: cursor-pointer">
        <img
          src={avatar ? URL.createObjectURL(avatar) : user.avatar}
          alt="avatar"
        />
        <input
          type="file"
          className=" top-36 z-10 absolute opacity-0 overflow-hidden h-60 w-120 ml-120 hover:scale-110 transition-shadow cursor-pointer"
          onChange={changeAvatar}
        />
      </div>
      <div className="mt-16 p-14 ">
        <button className="btn btn-primary float-right" onClick={handleSubmit}>
          Update Avatar
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
