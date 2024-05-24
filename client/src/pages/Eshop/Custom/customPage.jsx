/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";

function CustomPage() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle({ title: "Goods page" }));
  },[])
  return (
    <>
      <h1>Custom Page</h1>
    </>
  );
}
export default CustomPage;
