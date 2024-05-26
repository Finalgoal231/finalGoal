import React from "react";
import Subtitle from "../../../components/Typography/Subtitle";
import { AiOutlineTag, AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import moment from "moment";
import { Button } from "../../../components/Button";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { BiSolidEditAlt } from "react-icons/bi";
const ArticleCard = (prop) => {
  return (
    <>
      <div className={"card flex flex-col items-center w-full px-3 bg-base-100 shadow-xl mt-4"}>
        <div className="flex flex-col md:flex-row items-center w-[100%] bg-base-100 shadow-sm">
          <div className="flex flex-col items-center mr-4">
            <img
              alt="avatar"
              src={prop.avatar ? prop.avatar : "default.png"}
              className="w-16 rounded-full inline-block "
            />
            <div className="text-[20px]">{prop.favouriteNum}</div>
          </div>
          <div className="card flex w-11/12 p-3 bg-base-100 shadow-xl">
            <div className="flex justify-between">
              <div className="flex flex-row items-center">
                <Subtitle styleClass={"inline-block cursor-pointer"}>{prop.title}</Subtitle>
                <BiSolidEditAlt className="text-[30px] ml-4 cursor-pointer" onClick={prop.onEditArticle} />
              </div>
              <XMarkIcon className="h-7 w-7 cursor-pointer" onClick={prop.onDeleteArticle} />
            </div>
            <div className="divider mt-2"></div>
            <div className=" pb-2 bg-base-100 break-words ">{prop.content}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-around items-center w-full">
          <p className=" flex flex-row text-[20px] items-center">
            <AiOutlineCalendar className="text-[20px]" />
            {moment(prop.date).format("YYYY-MM-DD")}
          </p>
          <p className="flex flex-row text-[20px] items-center">
            <UserIcon className="h-5 w-5" />
            {prop.from}
          </p>
          {prop.type !== "draft" ? (
            <>
              <Button subject={"Favourite"} class="text-[15px] m-2" onClick={prop.onFavouriteClick} />
              <Button subject={"Comment"} class="text-[15px] m-2" onClick={prop.omCommentClick} />
            </>
          ) : (
            <Button subject={"Send"} class="text-[15px] m-2" onClick={prop.onSendClick} />
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
