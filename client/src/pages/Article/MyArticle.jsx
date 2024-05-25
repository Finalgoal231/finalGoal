/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

function MyArticle() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle({ title: "My Article" }));
  },[])
  return (
    <>
      <h1>My Article</h1>
    </>
  );
}
export default MyArticle;
