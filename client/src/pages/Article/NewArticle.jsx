import React, { useEffect, useState } from "react";
import InputText from "../../components/Input/InputText";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SelectBox from "../../components/Input/SelectBoxSmall";
import Input from "../../components/Input/Input";
import TextAreaInput from "../../components/Input/TextAreaInput";

const NewArticle = () => {
    const dispatch = useDispatch();
    const [tags, setData] = useState([]);
    const [newArticle, setNewArticle] = useState({
        from: "",
        title: "",
        tags: [],
        category: "",
        content: "",
    });
    const setHandleArticle=()=>{
setNewArticle({...newArticle})
    }
    const addTags = (e) => {
        if (e.key === "Enter") {
            setData([...tags, e.target.value]);
            e.target.value = "";
        }
    };
    const deleteTags = (index) => {
        tags.splice(index, 1);
        setData([...tags]);
    };
    useEffect(() => {
        dispatch(setPageTitle({ title: "New Article" }));
    }, []);
    return (
        <>
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
                    options={["Express", "React", "Node.js", "MongoDB"]}
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
                className={"h-[500px]"}
                placeholder={"Input Content of Article"}
                labelStyle={"text-[30px]"}
            />
        </>
    );
};
export default NewArticle;
