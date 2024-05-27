import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import { BsPlusLg } from "react-icons/bs";
import { createProfile } from "../../../redux/authSlice";
import ProfileAvatar from "../../../components/Avatar";
import SelectBoxBig from "../../../components/Input/SelectBoxBig";
import { mapValues, uniq } from "lodash";

function ProfileSettings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.admin);

  const [cates, setCates] = useState([]);
  const [profile, setProfile] = useState({
    username: user.username,
    name: user.name,
    bio: user.bio,
    category: user.category,
  });

  useEffect(() => {
    setCates(Object.values(mapValues(categories, (cate) => cate.title)));
  }, [categories]);

  const [selectTag, setSelectTag] = useState();
  const [tag, setTag] = useState([]);

  const setHandleTag = (e) => {
    setSelectTag(e.target.value);
  };

  const addTags = () => {
    if (selectTag) {
      let uniqTag = uniq([...tag, selectTag]);
      setTag(uniqTag);
    }
  };

  const deleteTags = (index) => {
    tag.splice(index, 1);
    setTag([...tag]);
  };

  const updateProfile = () => {
    dispatch(createProfile({ ...profile, complete: true }));
  };

  const setHandleProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="flex justify-center">
          <ProfileAvatar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <InputText labelTitle="Name" value={profile.name} />
          <InputText labelTitle="Username" value={profile.username} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
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
          <SelectBoxBig
            label={"Category"}
            class="w-full "
            options={["", ...cates]}
            onChange={(e) => setHandleTag(e)}
          />
        </div>
        <div className="flex items-center">
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
              className="flex px-4 py-2 mt-5 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-[15px] text-white rounded-[6px] cursor-pointer transition duration-300 ease-out"
            >
              <BsPlusLg className="text-[21px] mt-[2px] mr-[3px]" />
              <div className="mt-[1px]">Category</div>
            </button>
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
