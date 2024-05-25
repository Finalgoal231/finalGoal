import TitleCard from "../../../../components/Cards/TitleCard";
import InputText from "../../../../components/Input/InputText";
import { BsPlusLg} from "react-icons/bs";


function InputCategory() {
  return (
    <>
      <TitleCard title="Category" topMargin="mt-6" />
      <InputText labelTitle="Category" defaultValue="" />
      <button
        type="button"
        className="flex px-4 py-2 mt-5 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
      >
        <BsPlusLg className="text-[21px] mt-[2px] mr-[3px]" />
        <div className="mt-[1px]">New</div>
      </button>
    </>
  );
}

export default InputCategory;
