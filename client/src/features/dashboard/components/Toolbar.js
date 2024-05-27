import React from "react";
import SearchBar from "../.././../components/Input/SearchBar";
import SelectBoxSmall from "../../../components/Input/SelectBoxSmall";
import { Button } from "../../../components/Button";
import { AiOutlineTag, AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";

const Toolbar = (prop) => {
  return (
    <>
      <div className="flex justify-around items-center flex-col gap-2 sm:flex-row">
        <div className="flex flex-row">
          <SearchBar onChange={prop.setSearchval} />
          <Button subject={"Search"} onClick={prop.setSearch} />
        </div>
        <SelectBoxSmall
          class={"text-[15px]"}
          options={["Latest", "Comment", "favourite", "title"]}
          onChange={prop.setSortIndex}
        />
        <SelectBoxSmall
          class={"text-[15px]"}
          options={["React", "Express", "Node.js", "MongoDB"]}
          onChange={prop.setCategoryIndex}
        />
        <button
          type="button"
          className="flex px-4 py-2 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-[20px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
          onClick={prop.onAddClick}
        >
          <AiOutlinePlus className="text-[30px]" /> New
        </button>
      </div>
    </>
  );
};

export default Toolbar;
