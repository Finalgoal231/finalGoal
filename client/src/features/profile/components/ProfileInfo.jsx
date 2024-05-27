import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../redux/adminSlice";
import moment from "moment";
import { addFollower } from "../../../redux/authSlice";
import MyArticle from "../../../pages/Article/MyArticle";

const ProfileInfo = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { selectUser } = useSelector((state) => state.admin);

  const followUser = () => {
    dispatch(addFollower({id: id, from: user._id}))
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div className=" w-10/12 m-auto">
      {selectUser.name !== undefined && (
        <div className="flex justify-center gap-10">
          <div className="w-1/3 h-auto flex flex-col items-center">
            <div className="w-full p-3 bg-white dark:bg-brandDarkSecondary rounded-lg shadow-sm flex flex-col items-center">
              <div className="relative h-[150px] w-full bg-gradient-to-r from-cyan-500 to-sky-500">
                <div className="w-full">
                  <img
                    src={selectUser.avatar}
                    alt="Avatar"
                    className="rounded-full h-[200px] w-[200px] absolute -bottom-[100px] left-0 right-0 mx-auto"
                  />
                </div>
              </div>
              <div className="mt-[120px] items-center dark:text-gray-300">
                <h4 className="text-4xl text-black">{selectUser.name}</h4>
                <h4 className="text-center">{selectUser.username}</h4>
              </div>
              <div className="flex items-center justify-between w-1/2 m-auto my-5">
                <div className="flex gap-2 items-center">
                  <div className="text-xl text-black dark:text-gray-750">
                    {selectUser.followers.length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-350 text-md">
                    Followers
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-xl text-black dark:text-gray-750">
                    {selectUser.following.length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-350 text-md">
                    Following
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-gray-500 dark:text-gray-350 text-md">
                  Joined at {moment(selectUser.createdAt).format("YYYY-MM-DD")}
                </div>
              </div>
              <div className="w-full mt-5">
                <button
                  type="button"
                  className="px-4 py-2 border hover:bg-green-600 dark:hover:bg-green-500 border-green-600 dark:border-green-500 text-[15px] text-green-600 dark:text-green-500 hover:text-white dark:hover:text-white rounded-[6px] cursor-pointer transition duration-300 ease-out w-full"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/3"><MyArticle id={id} /></div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
