import { useDispatch } from "react-redux";
import { showNotification } from "../../../../../features/common/headerSlice";
import TitleCard from "../../../../../components/Cards/TitleCard";
import InputText from "../../../../../components/Input/InputText";
import TextAreaInput from "../../../../../components/Input/TextAreaInput";
import ToogleInput from "../../../../../components/Input/ToogleInput";
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
      <TitleCard title="Account Settings" topMargin="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
        <div>
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
        <div className="divider"></div>

        <div className="mt-8">
          <button
            className="btn btn-primary w-full"
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
