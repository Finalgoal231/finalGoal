import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Charts from "../../components/features/charts";
import { setPageTitle } from "../../components/features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Analytics" }));
  }, []);

  return <Charts />;
}

export default InternalPage;
