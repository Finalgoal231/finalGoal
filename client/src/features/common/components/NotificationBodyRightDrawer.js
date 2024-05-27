import { useSelector } from "react-redux";

function NotificationBodyRightDrawer() {
  const state = useSelector((state) => state.article);
  console.log(state);
  return (
    <>
      {[""].map((v, i) => {
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
