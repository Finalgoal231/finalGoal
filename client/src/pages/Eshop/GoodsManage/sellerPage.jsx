/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";

function GoodsManage() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle({ title: "Seller Manage" }));
  },[])
  return (
    <>
      <h1>Seller Page</h1>
    </>
  );
}
export default GoodsManage;
