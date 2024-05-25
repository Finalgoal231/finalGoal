import React from "react";

export const SmallNav = () => {
  return (
    <div>
      <ul className=" list-none m-0 p-0 overflow-hidden bg-black w-full flex">
        <li className="w-1/5">
          <div className=" block text-center font-bold text-3xl p-2 hover:bg-slate-500  cursor-pointer">
            User Info
          </div>
        </li>
        <li className="w-1/5">
          <div className=" block text-center font-bold text-3xl p-2 hover:bg-slate-500  cursor-pointer">
            Change Password
          </div>
        </li>
      </ul>
    </div>
  );
};
