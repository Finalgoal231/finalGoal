import React, { useEffect, useState } from "react";
import InputText from "../../components/Input/InputText";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SelectBox from "../../components/Input/SelectBoxSmall";
import Input from "../../components/Input/Input";
import TextAreaInput from "../../components/Input/TextAreaInput";
import { Button } from "../../components/Button";
import { createArticle } from "../../redux/articleSlice";

const NewArticle = () => {
    const dispatch = useDispatch();
    const [tags, setData] = useState([]);
    const [newArticle, setNewArticle] = useState({
        from: JSON.parse(localStorage.getItem("user"))._id,
        title: "",
        tags: [],
        category: "express",
        content: "",
        complete: false,
    });
    const setHandleArticle = (e) => {
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    };
    const setHandleSend = () => {
        dispatch(createArticle({ ...newArticle, complete: true }));
    };
    const addTags = (e) => {
        if (e.key === "Enter") {
            setData([...tags, e.target.value]);
            setNewArticle({ ...newArticle, tags });
            e.target.value = "";
        }
    };
    const deleteTags = (index) => {
        tags.splice(index, 1);
        setNewArticle({ ...newArticle, tags });
        setData([...tags]);
    };
    useEffect(() => {
        dispatch(setPageTitle({ title: "New Article" }));
    }, []);
    return (
        <div className="">
            <InputText
                name={"title"}
                labelTitle={"Title:"}
                placeholder={"Input Title of Article"}
                labelStyle={"text-[30px]"}
                onChange={setHandleArticle}
            />
            <div className={`form-control w-full flex sm:flex-row flex-col `}>
                <label className="label w-1/5">
                    <span className={"label-text text-[30px]"}>Category:</span>
                </label>
                <SelectBox
                    class={"w-full text-[30px] m-2 w-4/5"}
                    options={["express", "react", "node.js", "mongoDB"]}
                    onChange={setHandleArticle}
                    name={"category"}
                />
            </div>
            <div className={`form-control w-full flex sm:flex-row flex-col justify-between`}>
                <label className="label w-[1/5]">
                    <span className={"label-text text-[30px]"}>Tags:</span>
                </label>
                <div className={`form-control w-4/5 mb-4 flex sm:flex-row flex-col input border-2`}>
                    {tags.length > 0 &&
                        tags.map((value, index) => (
                            <div key={index} className="flex sm:flex-row flex-col items-center m-1 w-max border-2 mr-2">
                                <div className=" text-[15px] mr-1 text-ellipsis overflow-hidden max-w-[50px]">
                                    {value}
                                </div>
                                <button className="border-1 text-[15px]" onClick={() => deleteTags(index)}>
                                    &times;
                                </button>
                            </div>
                        ))}
                    <Input
                        name={"tags"}
                        placeholder={"Input Tags of Article"}
                        labelStyle={"text-[30px]"}
                        setHandleKeyDown={addTags}
                    />
                </div>
            </div>
            <TextAreaInput
                name={"content"}
                className={"h-[500px] mb-4"}
                placeholder={"Input Content of Article"}
                labelStyle={"text-[30px]"}
                onChange={setHandleArticle}
            />
            <div className="flex justify-around">
                <Button subject={"Draft"} />
                <Button subject={"Send"} onClick={setHandleSend} />
            </div>
        </div>
    );
};
export default NewArticle;
