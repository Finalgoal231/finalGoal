import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import UserManagePanel from "./UserManagePanel";
import { allUser } from "../../../redux/adminSlice";

function UserManage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "User Manage" }));
    dispatch(allUser());
  }, [dispatch]);
  return (
    <>
      <h1>User Page</h1>
      <UserManagePanel />
    </>
  );
}
export default UserManage;
