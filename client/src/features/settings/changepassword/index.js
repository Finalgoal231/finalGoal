import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import { useDispatch, useSelector } from "react-redux";
import ProfileAvatar from "../../../components/Avatar";
import { NotificationManager } from "react-notifications";
import { changePassword } from "../../../redux/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [id, setId] = useState();
  const [newData, setNewData] = useState({
    currentPassword: "",
    newpassword: "",
  });
  const [conPass, setConPass] = useState("");

  useEffect(() => {
    setId(user._id);
  }, [user._id]);

  const handlePassword = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleConPass = (e) => {
    setConPass(e.target.value);
  };

  const setHandleSend = () => {
    if (conPass === newData.newpassword) {
      dispatch(changePassword({ params: id, payload: newData }));
    } else {
      NotificationManager.warning(
        "Password and confirm password must be equal!!!",
        "WARNING"
      );
    }
  };
  return (
    <div>
      <TitleCard title="Change Password " topMargin="mt-10">
        <div className="flex gap-20 mt-10">
          <ProfileAvatar />
          <div className="w-[70%] grid grid-cols-1 md:grid-cols-1 gap-20">
            <InputText
              type={"password"}
              name={"currentPassword"}
              labelTitle={"Current:"}
              placeholder={"Input Current Password"}
              labelStyle={"text-[20px]"}
              onChange={handlePassword}
            />
            <InputText
              type={"password"}
              name={"newpassword"}
              labelTitle={"New:"}
              placeholder={"Input New Password"}
              labelStyle={"text-[20px]"}
              onChange={handlePassword}
            />
            <InputText
              type={"password"}
              name={"confirmpassword"}
              labelTitle={"Confirm:"}
              placeholder={"Input Confirm Password"}
              labelStyle={"text-[20px]"}
              onChange={handleConPass}
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
            </div>
          </div>
          <div className="mt-16 mr-20">
            <div className="flex items-center flex-col relative">
              <button className="btn w-20 h-8">Cancel</button>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default ChangePassword;
