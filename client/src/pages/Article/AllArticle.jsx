/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

function AllArticle() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle({ title: "All Article" }));
    }, []);
    return (
        <>
            <h1>AllArticle</h1>
        </>
    );
}
export default AllArticle;
