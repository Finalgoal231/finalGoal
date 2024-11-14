import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Charts from "../../components/features/charts";
import { setPageTitle } from "../../components/features/common/headerSlice.js";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Analytics" }));
  }, [dispatch]);

  return <Charts />;
}

export default InternalPage;
