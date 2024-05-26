/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputCategory from "./components/InputCategory";
import TableCategory from "./components/TableCategory";
import { getAllCategory } from "../../../redux/adminSlice";

function CategoryPage() {
  const dispatch = useDispatch();
  const { flag } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [flag]);
  return (
    <>
      <h1>Category Page</h1>
      <InputCategory />
      <TableCategory />
    </>
  );
}
export default CategoryPage;
