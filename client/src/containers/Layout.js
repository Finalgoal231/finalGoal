import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import RightSidebar from "./RightSidebar";
import { useEffect } from "react";
import { removeNotificationMessage } from "../features/common/headerSlice";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ModalLayout from "./ModalLayout";
import io from "socket.io-client";

export const socketEmit = (type, data) => socket.emit(type, { data });

var socket;

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector((state) => state.header);

  // useEffect(() => {
  //   socket = io(process.env.REACT_APP_BASE_URL);
  //   socket.on("connect", function () {
  //     socket.emit("id", { userId: user.username });
  //     socket.on("like", function (data) {
  //       NotificationManager.success(data.msg, "Success");
  //     });
  //     socket.on("comment", function (data) {
  //       NotificationManager.success(data.msg, "Success");
  //     });
  //   });
  // }, [user.username]);

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, "Success");
      if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, "Error");
      dispatch(removeNotificationMessage());
    }
  }, [dispatch, newNotificationMessage, newNotificationStatus]);

  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer drawer-mobile">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent />
        <LeftSidebar />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />
    </>
  );
}

export default Layout;
