import React from "react";
import Subtitle from "../../../components/Typography/Subtitle";
import { AiOutlineTag, AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { Button } from "../../../components/Button";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
const ArticleCard = (prop) => {
    return (
        <>
            <div className={"card flex flex-col items-center w-full px-3 bg-base-100 shadow-xl mt-4"}>
                <div className="flex flex-col md:flex-row items-center w-[100%] bg-base-100 shadow-sm">
                    <img alt="avatar" src={prop.avatar} className="w-1/12 rounded-full inline-block mr-4" />
                    <div className="card flex w-11/12 p-3 bg-base-100 shadow-xl">
                        <div className="flex justify-between">
                            <Subtitle styleClass={"inline-block cursor-pointer"}>{prop.title}</Subtitle>
                            <XMarkIcon className="h-7 w-7 cursor-pointer" />
                        </div>
                        <div className="divider mt-2"></div>
                        <div className=" pb-2 bg-base-100 break-words ">{prop.content}</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-around items-center w-full">
                    <p className=" flex flex-row text-[20px] items-center">
                        <AiOutlineCalendar className="text-[20px]" />
                        {prop.date}
                    </p>
                    <p className="flex flex-row text-[20px] items-center">
                        <UserIcon className="h-5 w-5" />
                        {prop.from}
                    </p>
                    {prop.type !== "draft" ? (
                        <>
                            <Button subject={"Favourite"} class="text-[15px] m-2" onClick={prop.onFavouriteClick} />
                            <Button subject={"Comment"} class="text-[15px] m-2" onClick={prop.onAnswerClick} />
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
