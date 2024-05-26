import { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import { useSelector } from "react-redux";

function NotificationBodyRightDrawer() {
  const [arr, setArr] = useState([""]);
  const state = useSelector((state) => state.NotificationBodyRightDrawer);
  console.log(state);
  useEffect(() => {
    socket.on("createArticle-resend", function (msg) {
      console.log(msg);
      setArr([...arr, msg]);
    });
  });
  return (
    <>
      {arr.map((v, i) => {
        return (
          <div key={i} className={"grid mt-3 card bg-base-200 rounded-box p-3"}>
            {v}
          </div>
        );
      })}
    </>
  );
}

export default NotificationBodyRightDrawer;
