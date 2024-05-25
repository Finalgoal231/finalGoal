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

  const changeAvatar = (e) => {};
  return (
    <>
      <TitleCard className="" title="Profile Settings" topMargin="mt-5">
        <div>
          <div className="flex gap-20">
            <div className="mt-10 rounded-full overflow-hidden h-60 w-60 ml-20 hover:scale-110 transition-shadow cursor-pointer">
              <img src="./assets/avatar/avatar-17.jpg" />
              <input
                type="file"
                className=" top-36 z-10 absolute opacity-0 overflow-hidden h-60 w-120 ml-120 hover:scale-110 transition-shadow cursor-pointer"
                onchange={changeAvatar()}
              />
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
              <label for="country">Category</label>
              <select
                className=" h-14 rounded-xl border bg-transparent"
                id="bio"
                name="bio"
              >
                <option className=" bg-transparent" value="Rect">
                  React
                </option>
                <option className=" bg-transparent" value="Laravel">
                  Laravel
                </option>
                <option className=" bg-transparent" value="Full stack">
                  Full stack
                </option>
                <option className=" bg-transparent" value="Blockchain">
                  Blockchain
                </option>
              </select>
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
              className="btn btn-primary float-right"
              onClick={() => updateProfile()}
            >
              Update
            </button>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
