import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../components/features/common/headerSlice.js";
import Dashboard from "../../components/features/dashboard/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Dashboard" }));
  }, [dispatch]);

  return <Dashboard />;
}

export default InternalPage;
