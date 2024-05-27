import React, { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import { useDispatch } from "react-redux";
import { createPassword } from "../../../redux/authSlice";
import "../../../index.css";
import ProfileAvatar from "../../../components/Avatar";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState({
    currentPassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const setHandlePassword = (e) => {
    console.log(newData);
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const setHandleSend = () => {
    dispatch(createPassword({ ...newData, complete: true }));
  };
  return (
    <div>
      <TitleCard title="Change Password " topMargin="mt-10">
        <div className="flex gap-20 mt-10">
          <ProfileAvatar />
          <div className="w-[70%] grid grid-cols-1 md:grid-cols-1 gap-20">
            <InputText
              name={"currentPassword"}
              labelTitle={"Current:"}
              placeholder={"Input Current Password"}
              labelStyle={"text-[20px]"}
              onChange={setHandlePassword}
            />
            <InputText
              name={"newpassword"}
              labelTitle={"New:"}
              placeholder={"Input New Password"}
              labelStyle={"text-[20px]"}
              onChange={setHandlePassword}
            />
            <InputText
              name={"confirmpassword"}
              labelTitle={"Confirm:"}
              placeholder={"Input Confirm Password"}
              labelStyle={"text-[20px]"}
              onChange={setHandlePassword}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mt-16 mx-4">
            <div className="flex items-center flex-col relative">
              <button
                className="btn btn-primary w-20 h-8"
                onClick={setHandleSend}
              >
                Save
              </button>
              <div className="absolute passBtn"></div>
            </div>
          </div>
          <div className="mt-16 mr-20">
            <div className="flex items-center flex-col relative">
              <button className="btn w-20 h-8">Cancel</button>
              <div className="absolute passBtn"></div>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default ChangePassword;
