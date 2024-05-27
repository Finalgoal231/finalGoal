import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserManagePanel from "./UserManagePanel";
import { allUser } from "../../../redux/adminSlice";

function UserManage() {
  const [sortIndex, setSortIndex] = useState("createAt");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUser(sortIndex));
  }, [dispatch, sortIndex]);
  return (
    <>
      <h1>User Page</h1>
      <UserManagePanel setSortIndex={setSortIndex} />
    </>
  );
}
export default UserManage;
