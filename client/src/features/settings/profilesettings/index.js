import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";

function ProfileSettings() {
  const dispatch = useDispatch();

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard className="" title="Profile Settings" topMargin="mt-10">
        <div className="flex gap-20">
          <div className="mt-10 rounded-full overflow-hidden h-60 w-60 ml-20 hover:scale-110 transition-shadow cursor-pointer">
            <img src="./assets/avatar/avatar-17.jpg" />
          </div>

          <div className="w-[70%] grid grid-cols-1 md:grid-cols-1 gap-6">
            <InputText
              labelTitle="Username"
              defaultValue="alex@dashwind.com"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Name"
              defaultValue="Alex"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Bio"
              defaultValue=""
              updateFormValue={updateFormValue}
            />
          </div>
          {/* <div className="divider" ></div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                </div> */}
        </div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right mr-16 ml-16"
            onClick={() => updateProfile()}
          >
            Change password
          </button>
        </div>
        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
