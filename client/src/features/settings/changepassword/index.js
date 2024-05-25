import React from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";

const ChangePassword = () => {
  const updateFormValue = () => {};
  return (
    <div>
      <TitleCard className="" title="Change password " topMargin="mt-10">
        <div className="flex gap-20 mt-10">
          <div className=" rounded-full overflow-hidden h-60 w-60 ml-20 hover: cursor-pointer">
            <img src="./assets/avatar/avatar-17.jpg" />
            <input
              type="file"
              className=" top-36 z-10 absolute opacity-0 overflow-hidden h-60 w-120 ml-120 hover:scale-110 transition-shadow cursor-pointer"
            />
          </div>
          <div className="w-[70%] grid grid-cols-1 md:grid-cols-1 gap-20">
            <InputText
              labelTitle="Current password"
              defaultValue=""
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="New password"
              defaultValue=""
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Confirm password"
              defaultValue=""
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="mt-16">
          <button className="btn btn-primary float-right mr-16 ml-16">
            Cancel
          </button>
        </div>
        <div className="mt-16">
          <button className="btn btn-primary float-right">Save</button>
        </div>
      </TitleCard>
    </div>
  );
};

export default ChangePassword;
