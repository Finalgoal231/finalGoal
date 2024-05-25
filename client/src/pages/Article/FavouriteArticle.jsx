/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

function FavouriteArticle() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle({ title: "Favourite Article" }));
    }, []);
    return (
        <>
            <h1>Favourite Article</h1>
        </>
    );
}
export default FavouriteArticle;
