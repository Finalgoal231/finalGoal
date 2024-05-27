import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../../../components/Cards/TitleCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, permissionUser } from "../../../../../redux/adminSlice";
import InputDisabled from "../../../../../components/Input/Inputdisabled";
import SelectBoxSmall from "../../../../../components/Input/SelectBoxSmall";

function EditManage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.admin);
  const [role, setRole] = useState("Admin");
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id, user.role]);

  const updateAccount = () => {
    dispatch(permissionUser({ params: id, role: role }));
  };

  return (
    <>
      <TitleCard title="Account Settings" topMargin="mt-6">
        <div className="flex justify-center">
          <div className="w-64 h-64 flex justify-center items-center">
            <img src={`${user.avatar}`} alt="Avatar" className="rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputDisabled labelTitle="Name" value={user.name} />
          <InputDisabled labelTitle="Username" value={user.username} />
          <InputDisabled labelTitle="Roll" value={user.role} />
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <SelectBoxSmall
            value={role}
            options={["Admin", "Manager", "User"]}
            class="w-full"
            onChange={(e) => setRole(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => updateAccount()}>
            Roll Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default EditManage;
