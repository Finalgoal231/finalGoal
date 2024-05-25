/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";

function UserManage() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle({ title: "User Manage" }));
  },[])
  return (
    <>
      <h1>User Page</h1>
    </>
  );
}
export default UserManage;
