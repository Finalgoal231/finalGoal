import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../components/features/common/headerSlice";
import Dashboard from "../../components/features/dashboard/index";

function InternalPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Dashboard" }));
    }, []);

    return <Dashboard />;
}

export default InternalPage;
