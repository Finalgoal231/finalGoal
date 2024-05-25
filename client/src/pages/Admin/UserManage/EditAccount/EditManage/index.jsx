import { useDispatch } from "react-redux";
import { showNotification } from "../../../../../features/common/headerSlice";
import TitleCard from "../../../../../components/Cards/TitleCard";
import InputText from "../../../../../components/Input/InputText";
import InputDisabled from "../../../../../components/Input/DisabledText";

function EditManage() {
  const dispatch = useDispatch();

  const updateAccount = () => {
    dispatch(showNotification({ message: "Account Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Account Settings" topMargin="mt-6">
        <div className="flex justify-center">
          <img
            src="http://192.168.6.2:3000/avatars/9?s=287"
            alt="Avatar"
            className="w-64 rounded-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputDisabled
            labelTitle="Name"
            defaultValue="Uchiha Itachi"
            updateFormValue={updateFormValue}
          />
          <InputDisabled
            labelTitle="Username"
            defaultValue="yonex"
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Password"
            defaultValue=""
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Role"
            defaultValue=""
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="mt-10">
          <button
            className="btn btn-ghost w-full"
            onClick={() => updateAccount()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default EditManage;
