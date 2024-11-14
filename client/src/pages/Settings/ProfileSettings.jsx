import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../components/features/common/headerSlice";
import ProfileSettings from "../../components/features/settings/profilesettings";
import { getAllCategory } from "../../redux/adminSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
    dispatch(getAllCategory())
  }, [dispatch]);

  return <ProfileSettings />;
}

export default InternalPage;
