import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ProfileSettings from "../../features/settings/profilesettings";
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
