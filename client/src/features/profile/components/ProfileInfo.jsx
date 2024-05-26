import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../redux/adminSlice";
import moment from "moment";

const ProfileInfo = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);
  console.log(user);
  return (
    <>
      {user.name !== undefined && (
        <div className="flex justify-center gap-10">
          <div className="w-1/3 h-auto border-4 flex flex-col items-center">
            <div className="">
              <img src={user.avatar} alt="Avatar" />
            </div>
            <div className="font-bold">{user.username}</div>
            <div>{user.name}</div>
            <div>{moment(user.createdAt).format("YYYY-MM-DD")}</div>
            <div>{user.followers.length} Follower</div>
            <div>{user.following.length} Following</div>
            <div><button>Follow</button></div>
          </div>
          <div className="w-2/3">123</div>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
