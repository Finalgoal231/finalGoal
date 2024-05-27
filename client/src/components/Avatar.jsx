import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../redux/authSlice";
import { BiSolidEditAlt } from "react-icons/bi";

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
        <button
          type="button"
          onClick={handleSubmit}
          className="flex px-4 py-2 bg-sky-500 hover:bg-sky-600 dark:hover:bg-slate-400 text-[15px] text-white rounded-[5px] cursor-pointer transition duration-300 ease-out"
        >
          <BiSolidEditAlt className="text-[21px] mt-[2px] mr-[3px]" />
          <div className="mt-[1px]">Update Avatar</div>
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
