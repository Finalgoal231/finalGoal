import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../redux/adminSlice";

const ProfileInfo = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="flex justify-center gap-10">
        <div className="w-1/3 h-32 border-4 flex flex-col items-center" >
          <div className=""><img src="default.jpg" alt="Avatar" /></div>
          <div className="font-bold">{user.username}</div>
          <div>{user.name}</div>
          <div>Join Date</div>
          <div>Follows-Following</div>
          <div>Follow</div>
        </div>
        <div className="w-2/3">123</div>
      </div>
    </>
  );
};

export default ProfileInfo;
