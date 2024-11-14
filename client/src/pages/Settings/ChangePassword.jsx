import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../components/features/common/headerSlice.js";
import ChangePassword from "../../components/features/settings/changepassword";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
  }, [dispatch]);

  return <ChangePassword />;
}

export default InternalPage;
