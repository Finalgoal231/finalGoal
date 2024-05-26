import React, { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import { useDispatch } from "react-redux";
import { createPassword } from "../../../redux/authSlice";
import "../../../index.css";

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
      <TitleCard title="Change password " topMargin="mt-10">
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
              name={"currentPassword"}
              labelTitle={"Current password:"}
              placeholder={"Input Title of Current Password"}
              labelStyle={"text-[30px]"}
              onChange={setHandlePassword}
            />
            <InputText
              name={"newpassword"}
              labelTitle={"New password:"}
              placeholder={"Input Title of  New Password"}
              labelStyle={"text-[30px]"}
              onChange={setHandlePassword}
            />
            <InputText
              name={"confirmpassword"}
              labelTitle={"Confirm password:"}
              placeholder={"Input Title of  Confirm Password"}
              labelStyle={"text-[30px]"}
              onChange={setHandlePassword}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mt-16 mx-16">
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
          <div className="mt-16 mx-16">
            <div className="flex items-center flex-col relative">
              <button className="btn btn-primary w-20 h-8">Cancel</button>
              <div className="absolute passBtn"></div>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default ChangePassword;
