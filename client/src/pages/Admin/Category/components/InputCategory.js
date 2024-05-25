import TitleCard from "../../../../components/Cards/TitleCard";
import InputText from "../../../../components/Input/InputText";
import { BsPlusLg } from "react-icons/bs";
import { createCategory } from "../../../../redux/adminSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiSolidEditAlt } from "react-icons/bi";


function InputCategory() {
  // const {category} = useSelector(state => state.action)
  const [data, setData] = useState("");

  // useEffect(() => {
  //   setData(category);
  // },[])

  const create = useCallback(() => {
    // const dispatch(createCategory());
  }, []);
  return (
    <>
      <TitleCard title="Category" topMargin="mt-6" />
      <InputText labelTitle="Category" defaultValue="" />

      {/* {category === "" ? ( */}
        <button
          type="button"
          className="flex px-4 py-2 mt-5 w-20 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
        >
          <BsPlusLg className="text-[21px] mt-[2px] mr-[3px]" />
          <div className="mt-[1px]" onClick={() => create()}>
            New
          </div>
        </button>
      {/* ) : ( */}
        <button
          type="button"
          className="flex px-4 py-2 mt-5 w-20 bg-sky-600 hover:bg-sky-700 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
        >
          <BiSolidEditAlt className="text-[21px] mt-[2px] mr-[3px]" />
          <div className="mt-[1px]" onClick={() => create()}>
            Edit
          </div>
        </button>
      {/* )} */}
    </>
  );
}

export default InputCategory;
