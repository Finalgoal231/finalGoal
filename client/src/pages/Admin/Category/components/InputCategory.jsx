import TitleCard from "../../../../components/Cards/TitleCard";
import BigInputText from "../../../../components/Input/BigInputText";
import { BsPlusLg } from "react-icons/bs";
import { createCategory, updateCategory } from "../../../../redux/adminSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidEditAlt } from "react-icons/bi";
import { NotificationManager } from "react-notifications";
import StanSearchBar from "../../../../components/Input/StanSearchBar";

function InputCategory({searchVal, setSearchVal}) {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.admin);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ title: "", _id: "" }); 

  useEffect(() => {
    setData(category);
  }, [category]);

  const create = useCallback(() => {
    if (data.title !== "") {
      dispatch(createCategory({ title: data.title }))
        .then(() =>
          NotificationManager.success("Create Category Success!", "SUCCESS")
        )
        .catch(() =>
          NotificationManager.error("Create Category Error!", "ERROR")
        );
      setData({ title: "", _id: "" });
    } else {
      NotificationManager.error("Input Correctly!", "ERROR");
    }
  }, [dispatch, data]);

  const edit = useCallback(
    (val) => {
      dispatch(updateCategory({ title: val.title, _id: val._id }))
        .then(() =>
          NotificationManager.success("Update Category Success!", "SUCCESS")
        )
        .catch(() =>
          NotificationManager.error("Update Category Error!", "ERROR")
        );
      setData({ title: "", _id: "" });
    },
    [dispatch]
  );
  return (
    <TitleCard title="Category" topMargin="mt-6">
      <BigInputText
        labelTitle="Category"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      {category.title === "" ? (
        <button
          type="button"
          onClick={() => create()}
          className="flex px-4 py-2 mt-5 w-24 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
        >
          <BsPlusLg className="text-[21px] mt-[2px] mr-[3px]" />
          <div className="mt-[1px]">Create</div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => edit(data)}
          className="flex px-4 py-2 mt-5 w-24 bg-sky-500 hover:bg-sky-600 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
        >
          <BiSolidEditAlt className="text-[21px] mt-[2px] mr-[3px]" />
          <div className="mt-[1px]">Update</div>
        </button>
      )}
      <StanSearchBar
        searchText={searchVal}
        styleClass="mr-4 float-right"
        setSearchText={setSearchVal}
      />
    </TitleCard>
  );
}

export default InputCategory;
