import React from "react";
import Subtitle from "../../../components/Typography/Subtitle";
import { AiOutlineTag, AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import moment from "moment";
import { Button } from "../../../components/Button";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { BiSolidEditAlt } from "react-icons/bi";
const ArticleCard = (prop) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex items-end flex-col mt-4">
      <div className={"card flex flex-row items-center w-full px-3 bg-[#c5c5c5] shadow-xl mt-4"}>
        <div className="flex flex-col items-center mr-4 ">
          <img
            alt="avatar"
            src={prop.avatar ? prop.avatar : "default.png"}
            className="w-24 rounded-t-xl inline-block my-1"
          />
          <div className="text-[15px] shadow-inner rounded-lg shadow-black px-5 "> {prop.from}</div>
        </div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center w-[100%]  bg-[#cccccc] shadow-sm">
            <div className="card flex w-full p-3 bg-[#cccccc] ">
              <div className="flex justify-between border-b-2 mb-2">
                <div className="flex flex-row items-center ">
                  <Subtitle styleClass={"inline-block cursor-pointer"} onClick={prop.setShowArticle}>
                    {prop.title}
                  </Subtitle>
                  <BiSolidEditAlt className="text-[30px] ml-4 cursor-pointer" onClick={prop.onEditArticle} />
                </div>
                {user.role === "user" && prop.type !== "myarticle" ? (
                  ""
                ) : (
                  <XMarkIcon className="h-7 w-7 cursor-pointer" onClick={prop.onDeleteArticle} />
                )}
              </div>
              <div className=" pb-2 bg-[#cccccc] break-words shadow-inner rounded-lg shadow-black">{prop.content}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between border-solid border-b-black items-center w-3/5">
        <p className=" flex flex-row text-[20px] items-center">
          <AiOutlineCalendar className="text-[15px]" />
          {prop.date ? moment(prop.date).format("YYYY-MM-DD") : ""}
        </p>
        {prop.type !== "draft" ? (
          <div className="">
            <Button subject={"Favourite"} class="text-[15px] mx-2" onClick={prop.onFavouriteClick} />
            <Button subject={"Comment"} class="text-[15px] mx-2" onClick={prop.onCommentClick} />
          </div>
        ) : (
          <Button subject={"Send"} class="text-[15px] m-2" onClick={prop.onSendClick} />
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
