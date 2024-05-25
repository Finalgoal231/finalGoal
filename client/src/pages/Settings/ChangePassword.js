import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ChangePassword from "../../features/settings/changepassword";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
  }, [dispatch]);

  return <ChangePassword />;
}

export default InternalPage;
