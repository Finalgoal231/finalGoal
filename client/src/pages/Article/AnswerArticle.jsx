import React, { useEffect, useState } from "react";
import InputText from "../../components/Input/InputText";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle, showNotification } from "../../features/common/headerSlice";
import SelectBox from "../../components/Input/SelectBoxSmall";
import Input from "../../components/Input/Input";
import TextAreaInput from "../../components/Input/TextAreaInput";
import { Button } from "../../components/Button";
import { addComment } from "../../redux/articleSlice";
import { useParams } from "react-router-dom";
import ArticleCard from "../../features/dashboard/components/ArticleCard";

const NewArticle = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.article);
  const selected_id = useParams();
  const [newArticle, setNewArticle] = useState({
    from: JSON.parse(localStorage.getItem("user"))._id,
    title: "",
    tags: [],
    category: "express",
    content: "",
    complete: true,
  });
  const setHandleArticle = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };
  const setHandleComment = () => {
    dispatch(addComment({ id: selected_id.id, data: newArticle }));
  };
  const addTags = (e) => {
    if (e.key === "Enter") {
      setNewArticle({ ...newArticle, tags: [...newArticle.tags, e.target.value] });
      e.target.value = "";
    }
  };
  const deleteTags = (index) => {
    newArticle.tags.splice(index, 1);
    setNewArticle({ ...newArticle, tags: newArticle.tags });
  };
  useEffect(() => {
    dispatch(setPageTitle({ title: "Comment Article" }));
    if (value.isLoading) dispatch(showNotification({ message: value.message, status: 1 }));
  }, [dispatch, selected_id.id, value.isLoading, value.message]);
  return (
    <>
      <ArticleCard
        type={"answer"}
        title={value.selected.title}
        avatar={value.selected.avatar}
        favouriteNum={value.selected.favorite.length}
        content={value.selected.content}
        date={value.selected.createdAt}
        from={value.selected.from}
      />
      <div className="">
        <InputText
          name={"title"}
          labelTitle={"Title:"}
          placeholder={"Input Title of Article"}
          labelStyle={"text-[30px]"}
          value={newArticle.title}
          onChange={setHandleArticle}
        />
        <div className={`form-control w-full flex sm:flex-row flex-col justify-between`}>
          <label className="label w-1/5">
            <span className={"label-text text-[30px]"}>Category:</span>
          </label>
          <SelectBox
            container={"w-4/5"}
            class={"text-[30px] my-2 w-full"}
            options={["express", "react", "node.js", "mongoDB"]}
            onChange={setHandleArticle}
            value={newArticle.category}
            name={"category"}
          />
        </div>
        <div className={`form-control w-full flex sm:flex-row flex-col justify-between`}>
          <label className="label w-[1/5]">
            <span className={"label-text text-[30px]"}>Tags:</span>
          </label>
          <div className={`form-control w-4/5 mb-4 flex sm:flex-row flex-col input border-2`}>
            {newArticle.tags.length > 0 &&
              newArticle.tags.map((value, index) => (
                <div key={index} className="flex sm:flex-row flex-col items-center m-1 w-max border-2 mr-2">
                  <div className=" text-[15px] mr-1 text-ellipsis overflow-hidden max-w-[50px]">{value}</div>
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
          className={"h-[300px] mb-4"}
          placeholder={"Input Content of Article"}
          labelStyle={"text-[30px]"}
          value={newArticle.content}
          onChange={setHandleArticle}
        />
        <Button subject={"Comment"} onClick={setHandleComment} />
      </div>
    </>
  );
};
export default NewArticle;
