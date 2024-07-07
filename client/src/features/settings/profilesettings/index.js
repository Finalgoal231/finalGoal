import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import { BsPlusLg } from "react-icons/bs";
import { changeInfo } from "../../../redux/authSlice";
import ProfileAvatar from "../../../components/Avatar";
import SelectBoxBig from "../../../components/Input/SelectBoxBig";
import { mapValues, uniq } from "lodash";
import { NotificationManager } from "react-notifications";

function ProfileSettings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.admin);

  const [cates, setCates] = useState([]);
  const [profile, setProfile] = useState({
    username: user.username,
    name: user.name,
    bio: "FullStack",
    category: "",
  });
  const [selectTag, setSelectTag] = useState();
  const [tag, setTag] = useState([]);

  useEffect(() => {
    setCates(Object.values(mapValues(categories, (cate) => cate.title)));
  }, [categories]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const setHandleTag = (e) => {
    setSelectTag(e.target.value);
  };

  const addTags = () => {
    if (selectTag) {
      let uniqTag = uniq([...tag, selectTag]);
      setTag(uniqTag);
      profile.category = uniqTag;
    }
  };

  const deleteTags = (index) => {
    tag.splice(index, 1);
    setTag([...tag]);
  };

  const updateProfile = () => {
    dispatch(changeInfo({ params: user._id, payload: profile }));
    NotificationManager.success("Updated profile successfully");
  };

  const setHandleProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="flex justify-center">
          <div className="mt-5">Name</div>
          <InputText
            name={"name"}
            value={profile.name}
            onChange={(e) => handleChange(e)}
          />
          <div className="px-10">
            <ProfileAvatar />
          </div>

          <div className="mt-5">Username</div>
          <InputText
            name={"username"}
            value={profile.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div>
            <SelectBoxBig
              label={"Bio"}
              name={"bio"}
              class="w-full"
              value={profile.bio}
              options={[
                "FullStack",
                "Blockchain",
                "Frontend",
                "Backend",
                "Designer",
              ]}
              onChange={setHandleProfile}
            />
          </div>
          <div>
            <SelectBoxBig
              label={"Category"}
              class="w-full "
              options={["", ...cates]}
              onChange={(e) => setHandleTag(e)}
            />
            <div className="flex">
              <div
                className={`form-control w-11/12 m-2 flex sm:flex-row flex-col input border-2`}
              >
                {tag.map((value, index) => (
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
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={addTags}
                  className="flex px-4 py-2 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
                >
                  <BsPlusLg className="text-[21px] mt-[2px] mr-[3px]" />
                  <div className="mt-[1px]">Category</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="mt-4">
          <button
            className="btn btn-primary float-right w-full"
            onClick={() => updateProfile()}
          >
            Update Profile
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
