import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../components/features/common/headerSlice.js";
import EditManage from "./EditManage";

function EditAccount() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Account" }));
  }, [dispatch]);
  return (
    <>
      <h1>User Page</h1>
      <EditManage />
    </>
  );
}
export default EditAccount;
