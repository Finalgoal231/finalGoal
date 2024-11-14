import React, { useEffect, useState } from "react";
import InputText from "../../components/Input/InputText";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageTitle,
  showNotification,
} from "../../components/features/common/headerSlice";
import SelectBox from "../../components/Input/SelectBoxSmall";
import Input from "../../components/Input/Input";
import TextAreaInput from "../../components/Input/TextAreaInput";
import { Button } from "../../components/General/Button";
import {
  createArticle,
  getAArticles,
  updateArticle,
} from "../../redux/articleSlice";
import { useNavigate, useParams } from "react-router-dom";

const NewArticle = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.article);
  const selected_id = useParams();
  const navigate = useNavigate();

  const [newArticle, setNewArticle] = useState({
    from: JSON.parse(localStorage.getItem("user"))._id,
    title: "",
    tags: [],
    category: "express",
    content: "",
    complete: false,
  });

  useEffect(() => {
<<<<<<< HEAD
    if (selected_id.id !== 0 && selected_id.id !== "0") {
=======
    if (selected_id.id !== 0) {
>>>>>>> 4c2bd8ee5f3070ffe64da432c8f90bf245efb2eb
      setNewArticle({
        from: JSON.parse(localStorage.getItem("user"))._id,
        title: value.article.title,
        tags: [...value.article.tags],
        category: value.article.category,
        content: value.article.content,
        complete: value.article.complete,
      });
    }
<<<<<<< HEAD
  }, [selected_id.id, value.article]);

  useEffect(() => {
    dispatch(getAArticles(selected_id.id));
  }, [dispatch, selected_id.id]);
=======
  }, [newArticle, selected_id.id, value.article]);

  useEffect(() => {
    dispatch(getAArticles(selected_id.id));
  }, [dispatch, selected_id.id])
>>>>>>> 4c2bd8ee5f3070ffe64da432c8f90bf245efb2eb

  const setHandleArticle = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const setHandleSend = () => {
    if (
      newArticle.title === "" ||
      newArticle.tags.length === 0 ||
      newArticle.category === "" ||
      newArticle.content === ""
    ) {
      dispatch(
        showNotification({ message: "All field is required!", status: 0 })
      );
    } else {
      dispatch(createArticle({ ...newArticle, complete: true }));
    }
  };

  const setHandleDraft = () => {
    dispatch(createArticle(newArticle));
    if (value.message.length > 0)
      dispatch(showNotification({ message: value.message, status: 1 }));
  };

  const setHandleUpdate = () => {
    if (
      newArticle.title === "" ||
      newArticle.tags.length === 0 ||
      newArticle.category === "" ||
      newArticle.content === ""
    ) {
      dispatch(
        showNotification({ message: "All field is required!", status: 0 })
      );
    } else {
      dispatch(
        updateArticle({
          id: selected_id.id,
          data: { ...newArticle, complete: true },
        })
      );
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    if (value.handleFlag === true) {
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
  }, [navigate, value.handleFlag]);

=======
>>>>>>> 4c2bd8ee5f3070ffe64da432c8f90bf245efb2eb
  const addTags = (e) => {
    if (e.key === "Enter") {
      setNewArticle({
        ...newArticle,
        tags: [...newArticle.tags, e.target.value],
      });
      e.target.value = "";
    }
  };

  const deleteTags = (index) => {
    newArticle.tags.splice(index, 1);
    setNewArticle({ ...newArticle, tags: newArticle.tags });
  };

  useEffect(() => {
<<<<<<< HEAD
    if (selected_id.id !== 0 || selected_id.id !== "0") {
=======
    if (selected_id.id !== 0) {
>>>>>>> 4c2bd8ee5f3070ffe64da432c8f90bf245efb2eb
      dispatch(setPageTitle({ title: "Edit Article" }));
    } else dispatch(setPageTitle({ title: "New Article" }));
  }, [dispatch, selected_id.id, value.isLoading, value.message]);

  return (
    <div className="">
      <InputText
        name={"title"}
        labelTitle={"Title:"}
        placeholder={"Input Title of Article"}
        labelStyle={"text-[30px]"}
        value={newArticle.title}
        onChange={setHandleArticle}
      />
      <div
        className={`form-control w-full flex sm:flex-row flex-col justify-between`}
      >
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
      <div
        className={`form-control w-full flex sm:flex-row flex-col justify-between`}
      >
        <label className="label w-[1/5]">
          <span className={"label-text text-[30px]"}>Tags:</span>
        </label>
        <div
          className={`form-control w-4/5 mb-4 flex sm:flex-row flex-col input border-2`}
        >
          {newArticle.tags.length > 0 &&
            newArticle.tags.map((value, index) => (
              <div
                key={index}
                className="flex sm:flex-row flex-col items-center m-1 w-max border-2 mr-2"
              >
                <div className=" text-[15px] mr-1 text-ellipsis overflow-hidden max-w-[50px]">
                  {value}
                </div>
                <button
                  className="border-1 text-[15px]"
                  onClick={() => deleteTags(index)}
                >
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
        value={newArticle.content}
        onChange={setHandleArticle}
      />
<<<<<<< HEAD
      {selected_id.id === 0 || selected_id.id === "0" ? (
=======
      {selected_id.id === 0 ? (
>>>>>>> 4c2bd8ee5f3070ffe64da432c8f90bf245efb2eb
        <div className="flex justify-around">
          <Button subject={"Draft"} onClick={setHandleDraft} />
          <Button subject={"Send"} onClick={setHandleSend} />
        </div>
      ) : (
        <Button subject={"Update"} onClick={setHandleUpdate} />
      )}
    </div>
  );
};
export default NewArticle;
