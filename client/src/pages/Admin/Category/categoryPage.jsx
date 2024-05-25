/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";

function CategoryPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Category page" }));
  }, []);
  return(
    <>
      <h1>Category Page</h1>
    </>
  )
}
export default CategoryPage
