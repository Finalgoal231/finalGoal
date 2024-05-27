import { useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";

import { createProfile } from "../../../redux/authSlice";
import ProfileAvatar from "../../../components/Avatar";
import SelectBoxBig from "../../../components/Input/SelectBoxBig";

function ProfileSettings() {

  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    bio: "Full Stack",
    tag: ["React", "Angular"],
  });

  const addTags = (e) => {
    if (e.key === "Enter") {
      setProfile({ ...profile, tag: [...profile.tag, e.target.value] });
      e.target.value = "";
    }
  };

  const deleteTags = (index) => {
    profile.tag.splice(index, 1);
    setProfile({ ...profile, tag: [...profile.tag] });
  };

  const updateProfile = () => {
    dispatch(createProfile({ ...profile, complete: true }));
  };

  const setHandleProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="flex justify-center">
          <ProfileAvatar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <InputText labelTitle="Name" updateFormValue={updateFormValue} />
          <InputText labelTitle="Username" updateFormValue={updateFormValue} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <SelectBoxBig
            label={"Bio"}
            name={"bio"}
            class="w-full"
            options={["Full Stack", "Frontend", "Backend", "Designer"]}
            onChange={setHandleProfile}
          />
          <SelectBoxBig
            label={"Category"}
            class="w-full "
            options={["React", "Vue", "Angular"]}
          />
        </div>
        <div className="flex items-center">
          <button className="btn btn-primary w-1/10" onClick={addTags}>
            Category Add
          </button>
          <div
            className={`form-control w-4/5 m-2 flex sm:flex-row flex-col input border-2`}
          >
            {profile.tag.length > 0 &&
              profile.tag.map((value, index) => (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col items-center m-1 w-max border-2 mr-2"
                >
                  <div className=" text-[15px] mr-1">{value}</div>
                  <button
                    className="border-1 text-[15px]"
                    onClick={() => deleteTags(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>
          <div className="divider"></div>
          <div className="mt-16">
            <button
              className="btn btn-primary float-right w-full"
              onClick={() => updateProfile()}
            >
              Update Profile
            </button>
          </div>
        </div>
      </TitleCard>
      {/* <TitleCard className="" title="Profile Settings" topMargin="mt-5">
        <div>
          <div className="flex gap-20">

            <div className="w-px bg-white h-[50vh]"></div>

            <div className="w-[57%] grid grid-cols-1 md:grid-cols-1 gap-10 mt-10 items-center ">
              <InputText
                name={"username"}
                labelTitle={"Username:"}
                placeholder={"alex@dashwind.com"}
                labelStyle={"text-[30px]"}
                onChange={setHandleProfile}
              />
              <InputText
                name={"name"}
                labelTitle={"Name:"}
                placeholder={"Alex"}
                labelStyle={"text-[30px]"}
                onChange={setHandleProfile}
              />
              <div className="w-full flex gap-36 items-center">
                <label className=" ml-3 font-bold text-3xl ">Bio</label>
                <SelectBoxSmall
                  name={"bio"}
                  class="w-full"
                  options={["Full Stack", "Frontend", "Backend", "Designer"]}
                  onChange={setHandleProfile}
                />
              </div>
              <div className="w-full flex justify-between gap-[60px] items-center">
                <label className="ml-3 font-bold text-3xl">Category</label>
                <SelectBoxSmall
                  class="w-full "
                  options={["React", "Vue", "Angular"]}
                />
                <div className="">
                  <button
                    className="btn btn-primary float-right"
                    onClick={addTags}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div
                className={`form-control w-4/5 m-2 flex sm:flex-row flex-col input border-2`}
              >
                {profile.tag.length > 0 &&
                  profile.tag.map((value, index) => (
                    <div
                      key={index}
                      className="flex sm:flex-row flex-col items-center m-1 w-max border-2 mr-2"
                    >
                      <div className=" text-[15px] mr-1">{value}</div>
                      <button
                        className="border-1 text-[15px]"
                        onClick={() => deleteTags(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <button
              className="btn btn-primary float-right w-[500px]"
              onClick={() => updateProfile()}
            >
              Update
            </button>
          </div>
        </div>
      </TitleCard> */}
    </>
  );
}

export default ProfileSettings;
