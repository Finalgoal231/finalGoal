/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputCategory from "./components/InputCategory";
import TableCategory from "./components/TableCategory";
import { getAllCategory } from "../../../redux/adminSlice";

function CategoryPage() {
  const [sortIndex, setSortIndex] = useState("createAt");
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  const { flag } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllCategory({sortIndex, searchVal}));
  }, [flag, sortIndex, searchVal]);
  return (
    <>
      <h1>Category Page</h1>
      <InputCategory searchVal={searchVal} setSearchVal={setSearchVal} />
      <TableCategory setSortIndex={setSortIndex} />
    </>
  );
}
export default CategoryPage;
